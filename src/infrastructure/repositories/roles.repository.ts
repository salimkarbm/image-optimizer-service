import { AppDataSource } from '../../config/database/typeorm.config';
import { Role } from '../../modules/v1/roles/entities/roles.entity';
import BaseRepository from '../../shared/libs/base.repository';
import { EntityManager } from 'typeorm';

export class RoleRepository extends BaseRepository<Role> {
  constructor(entityManager: EntityManager) {
    super(entityManager.getRepository(Role));
  }
}

export const rolesRepo = new RoleRepository(AppDataSource.manager);
