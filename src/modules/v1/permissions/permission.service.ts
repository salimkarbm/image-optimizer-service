import { Request } from 'express';
import { permissionsRepo } from '../../../infrastructure/repositories/permissions.repository';
import { STATUS_CODE } from '../../../shared/constants';
import AppError from '../../../shared/utils/errors/appError';

export class PermissionsService {
  constructor() {}

  async createPermission(req: Request) {
    try {
      const hasPermission = await permissionsRepo.findOne({
        where: {
          key: req.body.key,
          action: req.body.action,
          resource: req.body.resource,
        },
      });
      if (hasPermission) {
        throw new AppError('Permission already exist', STATUS_CODE.BAD_REQUEST);
      }
      const permission = permissionsRepo.create({
        key: req.body.key,
        action: req.body.action,
        resource: req.body.resource,
        description: req.body.description,
      });
      return permissionsRepo.save(permission);
    } catch (err: any) {
      console.error('Error creating word:', err);
      if (err.code == 23505)
        throw new AppError('Permission already exist', STATUS_CODE.BAD_REQUEST);
      throw new AppError(
        'Error occur while creating word',
        STATUS_CODE.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

const permissionsService = new PermissionsService();
export default permissionsService;
