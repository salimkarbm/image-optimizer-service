import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE, SUCCESS_MESSAGE } from '../../../shared/constants';
import { getContext } from '../../../shared/context/get-context';
import { HttpResponse } from '../../../shared/utils';
import membershipService from './membership.service';

export const listMembers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ctx = getContext(req);
    const members = await membershipService.listMembers(ctx.organization!.id);
    return HttpResponse({
      response: res,
      data: members,
      status: STATUS_CODE.OK,
      message: SUCCESS_MESSAGE.FETCHED('Members'),
    });
  } catch (err) {
    return next(err);
  }
};
