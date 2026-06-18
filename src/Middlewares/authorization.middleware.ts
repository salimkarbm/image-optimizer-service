import { NextFunction, Request, Response } from 'express';
import { Permission } from '../modules/v1/permissions/entities/permission.entity';
import AppError from 'src/shared/utils/errors/appError';
import { STATUS_CODE } from 'src/shared/constants';
import authorizationService from '../modules/v1/authorization/authorization.service';

export const authorize =
  (permission: Permission['id']) =>
  (
    req: Request & { membership: { role: string } },
    res: Response,
    next: NextFunction,
  ) => {
    const { role } = req?.membership;
    const allowed = authorizationService.hasPermission(role, permission);

    if (!allowed) {
      throw new AppError('Unauthorized', STATUS_CODE.FORBIDDEN);
    }

    next();
  };
