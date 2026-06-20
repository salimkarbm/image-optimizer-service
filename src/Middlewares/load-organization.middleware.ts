import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '../shared/constants';
import AppError from '../shared/utils/errors/appError';
import organizationService from '../modules/v1/organization/organization.service';

export const loadOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const organizationId = req.params.organizationId;

  const organization = await organizationService.findOne({
    where: {
      id: organizationId,
    },
  });

  if (!organization) {
    throw new AppError('Organization not found', STATUS_CODE.NOT_FOUND);
  }

  req.organization = organization;

  next();
};
