import { NextFunction, Response } from 'express';
import { RequestContext } from '../../../shared/types/request/request';
import { STATUS_CODE, SUCCESS_MESSAGE } from '../../../shared/constants';
import { HttpResponse } from '../../../shared/utils';
import organizationService from './organization.service';

export const create = async (
  req: RequestContext,
  res: Response,
  next: NextFunction,
) => {
  try {
    const organization = await organizationService.createOrganization(
      req.user!.id,
      req.body,
    );
    return HttpResponse({
      response: res,
      data: organization,
      status: STATUS_CODE.CREATED,
      message: SUCCESS_MESSAGE.CREATED('Organization'),
    });
  } catch (err) {
    return next(err);
  }
};

export const listByUser = async (
  req: RequestContext,
  res: Response,
  next: NextFunction,
) => {
  try {
    const organizations = await organizationService.getUserOrganizations(
      req.user!.id,
    );
    return HttpResponse({
      response: res,
      data: organizations,
      status: STATUS_CODE.OK,
      message: SUCCESS_MESSAGE.FETCHED('Organizations'),
    });
  } catch (err) {
    return next(err);
  }
};

export const find = async (
  req: RequestContext,
  res: Response,
  next: NextFunction,
) => {
  try {
    const organizations = await organizationService.findOrganization(
      req.params.organizationId,
    );
    return HttpResponse({
      response: res,
      data: organizations,
      status: STATUS_CODE.OK,
      message: SUCCESS_MESSAGE.FETCHED('Organizations'),
    });
  } catch (err) {
    return next(err);
  }
};
