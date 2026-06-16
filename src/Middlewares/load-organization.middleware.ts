import { NextFunction, Request, Response } from 'express';
import { organizationRepo } from 'src/infrastructure/repositories/organization.repository';
import { STATUS_CODE } from 'src/shared/constants';
import AppError from '../shared/utils/errors/appError';

export const loadOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const organization = await organizationRepo.findOne({
    where: {
      id: req.params.organizationId,
    },
  });

  if (!organization) {
    throw new AppError('Organization not found', STATUS_CODE.NOT_FOUND);
  }

  req.organization = organization;

  next();
};
