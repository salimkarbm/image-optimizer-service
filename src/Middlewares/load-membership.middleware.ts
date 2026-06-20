import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '../shared/constants';
import AppError from '../shared/utils/errors/appError';
import membershipService from '../modules/v1/membership/membership.service';
import { RequestContext } from 'src/shared/types/request/request';
export const loadMembership = async (
  req: RequestContext,
  res: Response,
  next: NextFunction,
) => {
  const membership = await membershipService.findOne({
    where: {
      userId: req?.user?.id,
      organizationId: req?.organization?.id,
    },
  });

  if (!membership) {
    throw new AppError('Membership not found', STATUS_CODE.NOT_FOUND);
  }

  req.membership = membership;

  next();
};
