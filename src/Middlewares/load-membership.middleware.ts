import { NextFunction, Request, Response } from 'express';
import { membershipRepo } from 'src/infrastructure/repositories/membership.repository';
import { STATUS_CODE } from 'src/shared/constants';
import AppError from '../shared/utils/errors/appError';
export const loadMembership = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const membership = await membershipRepo.findOne({
    where: {
      userId: req.user.id,
      organizationId: req?.organization?.id,
    },
  });

  if (!membership) {
    throw new AppError('Membership not found', STATUS_CODE.NOT_FOUND);
  }

  req.membership = membership;

  next();
};
