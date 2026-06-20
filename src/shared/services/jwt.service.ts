import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { STATUS_CODE } from '../constants';
import AppError from '../utils/errors/appError';
import { ENVIRONMENT } from '../../config/environment';
import { Request } from 'express';
import { User } from '../types/users/user.type';

class JwtService {
  private readonly secretKey: string;

  constructor() {
    this.secretKey = ENVIRONMENT.JWT.secret;
  }

  async generateToken(
    payload: object,
    expiresIn: number = ENVIRONMENT.JWT.accessTokenExpiryInSeconds, // default to 15 minutes
  ): Promise<string> {
    try {
      return jwt.sign(payload, this.secretKey, {
        expiresIn,
        algorithm: 'HS256',
      });
    } catch (error) {
      console.error('Error generating JWT token:', error);
      throw new AppError(
        'Failed to generate JWT token',
        STATUS_CODE.INTERNAL_SERVER_ERROR,
      );
    }
  }

  generateAccessToken(user: User) {
    return jwt.sign(
      {
        sub: user.id,
      },
      this.secretKey!,
      {
        expiresIn: '7d',
      },
    );
  }

  async verifyToken(token: string): Promise<JwtPayload> {
    // try {
    const decoded = jwt.verify(token, this.secretKey);
    if (typeof decoded === 'string') {
      throw new AppError('Invalid token payload', STATUS_CODE.UNAUTHORIZED);
    }
    return decoded;
    // } catch (error) {
    //   if (error instanceof jwt.TokenExpiredError) {
    //     throw new AppError('Token expired', STATUS_CODE.UNAUTHORIZED);
    //   }
    //   throw new AppError('Invalid token', STATUS_CODE.UNAUTHORIZED);
    // }
  }

  extractToken(req: Request): string | null {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.split(' ')[1];
  }
}
const jwtService = new JwtService();
export default jwtService;
