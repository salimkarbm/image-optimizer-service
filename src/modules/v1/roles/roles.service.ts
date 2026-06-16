import { Request } from 'express';
import { STATUS_CODE } from '../../../shared/constants';
import { rolesRepo } from '../../../infrastructure/repositories/roles.repository';
import AppError from '../../../shared/utils/errors/appError';
export class RolesService {
  constructor() {}

  async createRole(req: Request) {
    try {
      const hasRole = await rolesRepo.findOne({
        where: {
          key: req.body.key,
          name: req.body.name,
        },
      });
      if (hasRole) {
        throw new AppError('Role already exist', STATUS_CODE.BAD_REQUEST);
      }
      const role = rolesRepo.create({
        key: req.body.key,
        name: req.body.name,
        isSystem: true,
      });
      return rolesRepo.save(role);
    } catch (err: any) {
      console.error('Error creating role:', err);
      if (err.code == 23505)
        throw new AppError('Role already exist', STATUS_CODE.BAD_REQUEST);
      throw new AppError(
        'Error occur while creating role',
        STATUS_CODE.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllRoles() {
    const roles = await rolesRepo.findAll();
    if (roles) {
      return roles;
    }
    throw new AppError(
      'Error occur while getting roles',
      STATUS_CODE.INTERNAL_SERVER_ERROR,
    );
  }
}

const rolesService = new RolesService();
export default rolesService;
