import { NextFunction, Request, Response } from 'express';
import { getContext } from '../../../shared/context/get-context';
import { STATUS_CODE, SUCCESS_MESSAGE } from '../../../shared/constants';
import { HttpResponse } from '../../../shared/utils';
import invitationService from './invitation.service';

export const createInvitation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ctx = getContext(req);
    const invitation = await invitationService.createInvitation(ctx, req.body);
    return HttpResponse({
      response: res,
      data: invitation,
      status: STATUS_CODE.CREATED,
      message: SUCCESS_MESSAGE.CREATED('Invitation'),
    });
  } catch (err) {
    return next(err);
  }
};

export const acceptInvitation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ctx = getContext(req);
    const token = req.params.token;
   
    const membership = await invitationService.accept(ctx?.user?.id!, token);

    return HttpResponse({
      response: res,
      data: membership,
      status: STATUS_CODE.OK,
      message: SUCCESS_MESSAGE.OK('Invitation accepted'),
    });
  } catch (err) {
    return next(err);
  }
};
