import { Request } from 'express';
import { permissionsRepo } from '../../../infrastructure/repositories/permissions.repository';
import { STATUS_CODE } from '../../../shared/constants';
import AppError from '../../../shared/utils/errors/appError';
import { rolePermissionsRepo } from '../../../infrastructure/repositories/role-permissions.repository';
import { rolesRepo } from '../../../infrastructure/repositories/roles.repository';
import { RolePermission } from './entities/role-permissions.entity';
import { Permission } from './entities/permission.entity';
import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { PaginatedQuery } from '../../../shared/types';

export class PermissionsService {
  constructor(private readonly permissionRepository: typeof permissionsRepo) {}

  async createPermission(permissions: Partial<Permission>) {
    try {
      const hasPermission = await this.permissionRepository.findOne({
        where: {
          key: permissions.key,
          action: permissions.action,
          resource: permissions.resource,
        },
      });
      if (hasPermission) {
        throw new AppError('Permission already exist', STATUS_CODE.BAD_REQUEST);
      }

      const permission = this.create({
        key: permissions.key,
        action: permissions.action,
        resource: permissions.resource,
        description: permissions.description,
      });
      return permission;
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
    const permissions = await permissionsRepo.findAll();
    if (permissions) {
      return permissions;
    }
  }

  async createRolePermission(req: Request) {
    try {
      const roleExist = await rolesRepo.findOne({
        where: {
          id: req.body.roleId,
        },
      });
      if (!roleExist) {
        throw new AppError('Role does not exist', STATUS_CODE.BAD_REQUEST);
      }
      const permissionExist = await permissionsRepo.findOne({
        where: {
          id: req.body.permissionId,
        },
      });
      if (!permissionExist) {
        throw new AppError(
          'Permission does not exist',
          STATUS_CODE.BAD_REQUEST,
        );
      }
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

  async getAllRolePermissions(query: Partial<RolePermission>) {
    const rolePermissions = await rolePermissionsRepo.findAll({
      where: {
        roleId: query.roleId?.toString(),
      },
    });
    return rolePermissions;
  }

  async create(permission: Partial<Permission>) {
    const newPermission = this.permissionRepository.create(permission);
    return await this.permissionRepository.save(newPermission);
  }

  async findOne(options: FindOneOptions<Permission>) {
    return this.permissionRepository.findOne(options);
  }

  async findAll(options?: FindManyOptions<Permission>) {
    return this.permissionRepository.findAll(options);
  }

  async count(options?: FindOneOptions<Permission>) {
    return this.permissionRepository.count(options);
  }

  async findPaginated(
    query: PaginatedQuery,
    options: FindManyOptions<Permission>,
  ) {
    return this.permissionRepository.findPaginated(query, options);
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<Permission>,
    partialEntity: Partial<Permission>,
    returnEntity = true,
  ): Promise<Permission | null | void> {
    return this.permissionRepository.findOneAndUpdate(
      where,
      partialEntity,
      returnEntity,
    );
  }

  async update(
    where: FindOptionsWhere<Permission>,
    partialEntity: Partial<Permission>,
  ) {
    return this.permissionRepository.update(where, partialEntity);
  }

  async remove(options: FindOptionsWhere<Permission>) {
    return this.permissionRepository.delete(options);
  }

  async save(session: Permission): Promise<Permission> {
    return this.permissionRepository.save(session);
  }
}

const permissionsService = new PermissionsService(permissionsRepo);
export default permissionsService;
