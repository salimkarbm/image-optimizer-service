import { Request } from 'express';
import { permissionsRepo } from '../../../infrastructure/repositories/permissions.repository';
import { STATUS_CODE } from '../../../shared/constants';
import AppError from '../../../shared/utils/errors/appError';
import { rolePermissionsRepo } from '../../../infrastructure/repositories/role-permissions.repository';

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
      console.error('Error creating permission:', err);
      if (err.code == 23505)
        throw new AppError('Permission already exist', STATUS_CODE.BAD_REQUEST);
      throw new AppError(
        'Error occur while creating permission',
        STATUS_CODE.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllPermissions() {
    const permissions = await permissionsRepo.findAll({});
    return permissions;
  }

  async createRolePermission(req: Request) {
    try {
      const hasRolePermission = await rolePermissionsRepo.findOne({
        where: {
          roleId: req.body.roleId,
          permissionId: req.body.permissionId,
        },
      });
      if (hasRolePermission) {
        throw new AppError(
          'Role Permission already exist',
          STATUS_CODE.BAD_REQUEST,
        );
      }
      const rolePermission = rolePermissionsRepo.create({
        roleId: req.body.roleId,
        permissionId: req.body.permissionId,
      });
      return rolePermissionsRepo.save(rolePermission);
    } catch (err: any) {
      console.error('Error creating role permission:', err);
      if (err.code == 23505)
        throw new AppError(
          'Role Permission already exist',
          STATUS_CODE.BAD_REQUEST,
        );
      throw new AppError(
        'Error occur while creating role permission',
        STATUS_CODE.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

const permissionsService = new PermissionsService();
export default permissionsService;
