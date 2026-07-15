import { NextFunction, Request, Response } from 'express';
import { RequestContext } from '../../../shared/types/request/request';
import { STATUS_CODE, SUCCESS_MESSAGE } from '../../../shared/constants';
import { HttpResponse } from '../../../shared/utils';
import organizationService from './organization.service';
import { getContext } from '../../../shared/context/get-context';

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ctx: RequestContext = getContext(req);
    const organization = await organizationService.createOrganization(
      ctx,
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

export const getOrganization = async (
  req: Request,
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

export const context = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ctx = getContext(req);
    const context = await organizationService.getOrganizationContext(ctx);
    return HttpResponse({
      response: res,
      data: context,
      status: STATUS_CODE.OK,
      message: SUCCESS_MESSAGE.FETCHED('Context'),
    });
  } catch (err) {
    return next(err);
  }
};
