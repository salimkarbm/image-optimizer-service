import { AppDataSource } from '../../config/database/typeorm.config';
import { RolePermission } from '../../modules/v1/permission/entities/role-permissions.entity';
import BaseRepository from '../../shared/libs/base.repository';
import { EntityManager } from 'typeorm';

export class RolePermissionsRepository extends BaseRepository<RolePermission> {
  constructor(entityManager: EntityManager) {
    super(entityManager.getRepository(RolePermission));
  }
}

export const rolePermissionsRepo = new RolePermissionsRepository(
  AppDataSource.manager,
);
