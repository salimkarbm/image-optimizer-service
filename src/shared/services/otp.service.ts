import CryptoJS from 'crypto-js';
import * as crypto from 'crypto';
import { ENV_CONFIG } from '../../config';

export class OTPService {
  private readonly tenMinutesInMs: number = 10 * 60 * 1000;
  private readonly fiveMinutesInMs: number = 5 * 60 * 1000;
  private readonly oneMinuteInMs: number = 60 * 1000;
  private readonly otpExpiry: number = this.tenMinutesInMs;
  private readonly secretKey: string = ENV_CONFIG.APP.ENCRYPTION_KEY;
  private readonly OTP_LENGTH = 6;
  private readonly MAX_OTP_GENERATION_ATTEMPTS = 3;
  private readonly OTP_GENERATION_INTERVAL = this.oneMinuteInMs;

  generateOTP(): string {
    try {
      // Generate a cryptographically secure random number
      const randomBytes = crypto.randomBytes(4); // 4 bytes = 32 bits
      const randomNumber = randomBytes.readUInt32BE(0);

      // Convert to a 6-digit number (000000-999999)
      const otp = (randomNumber % 1000000).toString().padStart(6, '0');
      return otp;
    } catch (error) {
      console.error('Error generating OTP:', error);
      throw new Error('Failed to generate OTP');
    }
  }

  strongHashOtp(otp: string): string {
    try {
      // HMAC uses your secretKey so rainbow tables won't work
      const hashedOtp = CryptoJS.HmacSHA256(otp, this.secretKey).toString();
      return hashedOtp;
    } catch (error) {
      console.error('Error hashing OTP:', error);
      throw new Error('Failed to hash OTP');
    }
  }

  verifyStrongHashedOtp(plainOtp: string, hashedOtp: string): boolean {
    const hash = CryptoJS.HmacSHA256(plainOtp, this.secretKey).toString();
    return hash === hashedOtp;
  }

  weakHashOtp(otp: string): string {
    try {
      const hashedOtp = CryptoJS.SHA256(otp).toString();
      return hashedOtp;
    } catch (error) {
      console.error('Error hashing OTP:', error);
      throw new Error('Failed to hash OTP');
    }
  }

  verifyWeakHashedOtp(hashedOtp: string, otpToVerify: string): boolean {
    try {
      console.debug('Verifying hashed OTP');
      const hashedInput = this.weakHashOtp(otpToVerify);
      const isValid = hashedOtp === hashedInput;
      console.debug(
        `Hashed OTP verification ${isValid ? 'successful' : 'failed'}`,
      );
      return isValid;
    } catch (error) {
      console.error('Error verifying hashed OTP:', error);
      return false;
    }
  }

  encryptOtp(otp: string, email: string): string {
    try {
      const timestamp = new Date().getTime();
      const data = `${otp}|${email}|${timestamp}`;
      const encryptedData = CryptoJS.AES.encrypt(
        data,
        this.secretKey,
      ).toString();
      return encryptedData;
    } catch (error) {
      console.error('Error encrypting OTP:', error);
      throw new Error('Failed to encrypt OTP');
    }
  }

  verifyEncryptedOtp(
    encryptedOtp: string,
    otpToVerify: string,
    email: string,
  ): boolean {
    try {
      // Decrypt the OTP data
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedOtp, this.secretKey);
      const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);

      // Split the data
      const [originalOtp, originalEmail, timestamp] = decryptedData.split('|');

      // Check if OTP is expired
      const otpTime = parseInt(timestamp, 10);
      const currentTime = new Date().getTime();
      if (currentTime - otpTime > this.otpExpiry) {
        console.debug('OTP verification failed: OTP expired');
        return false; // OTP expired
      }

      // Verify OTP and email
      const isValid = originalOtp === otpToVerify && originalEmail === email;
      console.debug(`OTP verification ${isValid ? 'successful' : 'failed'}`);
      return isValid;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return false;
    }
  }

  isOtpExpired(timestamp: number): boolean {
    const currentTime = new Date().getTime();
    const isExpired = currentTime - timestamp > this.otpExpiry;
    if (isExpired) {
      console.debug('OTP is expired');
    }
    return isExpired;
  }

  calculateOtpExpiration(expirationTimeInMinutes: number = 10): Date {
    return new Date(Date.now() + expirationTimeInMinutes * 60 * 1000);
  }

  getOtpExpiryTime(): Date {
    return new Date(Date.now() + this.otpExpiry);
  }
}
