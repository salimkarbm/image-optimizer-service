import { AppDataSource } from '../../config/database/typeorm.config';
import { Organization } from '../../modules/v1/organization/entities/organization.entity';
import BaseRepository from '../../shared/libs/base.repository';
import { EntityManager } from 'typeorm';

export class OrganizationRepository extends BaseRepository<Organization> {
  constructor(entityManager: EntityManager) {
    super(entityManager.getRepository(Organization));
  }
}

export const organizationRepo = new OrganizationRepository(
  AppDataSource.manager,
);
