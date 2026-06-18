import { STATUS_CODE } from '../shared/constants';
import AppError from '../shared/utils/errors/appError';
import { Request, Response, NextFunction } from 'express';
import jwtService from '../shared/services/jwt.service';
import userRepository from '../infrastructure/repositories/user/user.repository';
import { JwtPayload } from 'jsonwebtoken';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = jwtService.extractToken(req);

  if (!token) {
    throw new AppError('Missing token', STATUS_CODE.UNAUTHORIZED);
  }

  const payload: JwtPayload = jwtService.verifyToken(token);

  const user = await userRepository.findOne({
    where: {
      id: payload.sub,
    },
  });

  if (!user) {
    throw new AppError('User not found', STATUS_CODE.UNAUTHORIZED);
  }

  req.user = user;

  next();
};
