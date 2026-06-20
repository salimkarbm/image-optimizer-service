import { STATUS_CODE } from '../shared/constants';
import AppError from '../shared/utils/errors/appError';
import { Response, NextFunction, Request } from 'express';
import jwtService from '../shared/services/jwt.service';
import { JwtPayload } from 'jsonwebtoken';
import userService from '../modules/v1/users/users.service';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = jwtService.extractToken(req);

    if (!token) {
      throw new AppError('Missing token', STATUS_CODE.UNAUTHORIZED);
    }

    const payload: JwtPayload = jwtService.verifyToken(token);

    if (!payload) {
      throw new AppError('Invalid or Expired token', STATUS_CODE.UNAUTHORIZED);
    }

    const user = await userService.findOne({
      where: {
        id: payload.sub,
      },
    });

    if (!user) {
      throw new AppError('User not found', STATUS_CODE.UNAUTHORIZED);
    }

    req.user = user;

    next();
  } catch (err) {
    return next(err);
  }
};
