import { Request } from 'express';
import UserRepository from '../repositories/user/user.repository';
import { AppDataSource } from '../config/typeorm.config';
import AppError from '../shared/utils/errors/appError';
import { ERROR_MESSAGE, STATUS_CODE } from '../shared/constants';
import { EmailService } from '../shared/services/email.service';
import { OTPService } from '../shared/services/otp.service';
import { ENV_CONFIG } from '../config';
import User from '../users/entities/user.entity';

const userRepo = new UserRepository(AppDataSource.manager);
const emailService = new EmailService();
const otpService = new OTPService();

export class UserService {
  signUp = async (req: Request): Promise<User> => {
    const userExist = await userRepo.findOne({
      where: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (userExist) {
      throw new AppError(
        ERROR_MESSAGE.ALREADY_EXISTS('User with this email or username'),
        STATUS_CODE.NOT_FOUND,
      );
    }
    const otp = otpService.generateOTP();
    const user = userRepo.create({
      ...req.body,
      emailVerificationToken: otpService.strongHashOtp(otp),
      emailVerificationTokenExpires: otpService.calculateOtpExpiration(ENV_CONFIG.OTP.EXPIRY_TIME), // default to 10 minutes if not set
    });
    await userRepo.save(user);

    const message = {
          to: user.email,
          subject: 'Welcome to Image Processor API',
          from: ENV_CONFIG.MAILER.FROM,
        }

    try {
      const sendEmail = await emailService.signupOtpEmail(
        message,
        parseInt(otp, 10),
        user.firstName,
      );
      // retry ONLY if sending failed
      if (sendEmail.rejected.length > 0) {
        await emailService.retryEmail(message, emailService.signupOtpEmail.bind(emailService));
      }
    } catch (error) {
      // retry ONLY when email sending throws error
      // await emailService.retryEmail(message, sendEmail);

      // optional: remove user if email completely fails
      await userRepo.delete({
        id: user.id,
      });

      throw new AppError(
        'Failed to send verification email',
        STATUS_CODE.INTERNAL_SERVER_ERROR,
      );
    }
    return user;
  };
}
