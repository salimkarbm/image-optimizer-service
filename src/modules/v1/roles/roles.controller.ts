import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from '../../../shared/utils';
import { STATUS_CODE, SUCCESS_MESSAGE } from '../../../shared/constants';
import rolesService from './roles.service';

export const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await rolesService.createRole(req);
    return HttpResponse({
      response: res,
      data,
      status: STATUS_CODE.CREATED,
      message: SUCCESS_MESSAGE.CREATED('Role'),
    });
  } catch (err) {
    return next(err);
  }
};
