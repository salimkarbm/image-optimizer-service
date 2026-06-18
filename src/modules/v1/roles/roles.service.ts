import { Request } from 'express';
import { STATUS_CODE } from '../../../shared/constants';
import { rolesRepo } from '../../../infrastructure/repositories/roles.repository';
import AppError from '../../../shared/utils/errors/appError';
import { Role, ROLE_PRIORITY, SystemRole } from './entities/roles.entity';
import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { PaginatedQuery } from 'src/shared/types';
export class RolesService {
  constructor(private readonly roleRepository: typeof rolesRepo) {}

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
    return roles;
  }

  canManageRole(actorRole: SystemRole, targetRole: SystemRole): boolean {
    return ROLE_PRIORITY[actorRole] > ROLE_PRIORITY[targetRole];
  }

  isOwner(role: SystemRole): boolean {
    return role === SystemRole.OWNER;
  }

  canTransferOwnership(actorRole: SystemRole): boolean {
    return actorRole === SystemRole.OWNER;
  }

  async create(permission: Partial<Role>) {
    const newPermission = this.roleRepository.create(permission);
    return await this.roleRepository.save(newPermission);
  }

  async findOne(options: FindOneOptions<Role>) {
    return this.roleRepository.findOne(options);
  }

  async findAll(options?: FindManyOptions<Role>) {
    return this.roleRepository.findAll(options);
  }

  async count(options?: FindOneOptions<Role>) {
    return this.roleRepository.count(options);
  }

  async findPaginated(query: PaginatedQuery, options: FindManyOptions<Role>) {
    return this.roleRepository.findPaginated(query, options);
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<Role>,
    partialEntity: Partial<Role>,
    returnEntity = true,
  ): Promise<Role | null | void> {
    return this.roleRepository.findOneAndUpdate(
      where,
      partialEntity,
      returnEntity,
    );
  }

  async update(where: FindOptionsWhere<Role>, partialEntity: Partial<Role>) {
    return this.roleRepository.update(where, partialEntity);
  }
  async remove(options: FindOptionsWhere<Role>) {
    return this.roleRepository.delete(options);
  }

  async softDelete(where: FindOptionsWhere<Role>) {
    const res = await this.roleRepository.softDelete(where);
    return {
      status: !!res.status,
    };
  }

  async save(role: Role): Promise<Role> {
    return this.roleRepository.save(role);
  }
}

const rolesService = new RolesService(rolesRepo);
export default rolesService;
