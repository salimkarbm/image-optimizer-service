import { AppDataSource } from '../../config/database/typeorm.config';
import { Permission } from '../../modules/v1/permissions/entities/permission.entity';
import BaseRepository from '../../shared/libs/base.repository';
import { EntityManager } from 'typeorm';

export class PermissionsRepository extends BaseRepository<Permission> {
  constructor(entityManager: EntityManager) {
    super(entityManager.getRepository(Permission));
  }
}

export const permissionsRepo = new PermissionsRepository(AppDataSource.manager);
