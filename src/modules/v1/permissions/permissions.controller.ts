import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE, SUCCESS_MESSAGE } from '../../../shared/constants';
import { HttpResponse } from '../../../shared/utils';
import permissionsService from './permission.service';

export const createPermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await permissionsService.createPermission(req);
    return HttpResponse({
      response: res,
      status: STATUS_CODE.CREATED,
      message: SUCCESS_MESSAGE.CREATED('Permission'),
    });
  } catch (err) {
    return next(err);
  }
};

export const getAllPermissions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await permissionsService.getAllPermissions();
    return HttpResponse({
      response: res,
      data,
      status: STATUS_CODE.OK,
      message: SUCCESS_MESSAGE.FETCHED('Permissions'),
    });
  } catch (err) {
    return next(err);
  }
};
