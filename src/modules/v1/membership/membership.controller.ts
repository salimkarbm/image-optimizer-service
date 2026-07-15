import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE, SUCCESS_MESSAGE } from '../../../shared/constants';
import { getContext } from '../../../shared/context/get-context';
import { HttpResponse } from '../../../shared/utils';
import membershipService from './membership.service';
import AppError from '../../../shared/utils/errors/appError';

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

export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ctx = getContext(req);
    if (req.params.organizationId !== ctx.organization?.id) {
      throw new AppError('Organization not found', STATUS_CODE.NOT_FOUND);
    }
    const members = await membershipService.updateRole(
      ctx,
      req.params.memberId,
      req.body.newRole,
    );
    return HttpResponse({
      response: res,
      data: members,
      status: STATUS_CODE.OK,
      message: SUCCESS_MESSAGE.UPDATED('Member'),
    });
  } catch (err) {
    return next(err);
  }
};

export const removeMember = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ctx = getContext(req);
    if (req.params.organizationId !== ctx.organization?.id) {
      throw new AppError('Organization not found', STATUS_CODE.NOT_FOUND);
    }
    const members = await membershipService.removeMember(
      ctx,
      req.params.memberId,
    );
    return HttpResponse({
      response: res,
      data: members,
      status: STATUS_CODE.OK,
      message: SUCCESS_MESSAGE.DELETED('Member'),
    });
  } catch (err) {
    return next(err);
  }
};

export const leaveOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ctx = getContext(req);
    if (req.params.organizationId !== ctx.organization?.id) {
      throw new AppError('Organization not found', STATUS_CODE.NOT_FOUND);
    }
    const members = await membershipService.leaveOrganization(ctx);
    return HttpResponse({
      response: res,
      data: members,
      status: STATUS_CODE.OK,
      message: SUCCESS_MESSAGE.DELETED('Member'),
    });
  } catch (err) {
    return next(err);
  }
};
