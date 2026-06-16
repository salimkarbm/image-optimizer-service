import { AppDataSource } from '../../config/database/typeorm.config';
import { Membership } from '../../modules/v1/membership/entities/members.entity';
import BaseRepository from '../../shared/libs/base.repository';
import { EntityManager } from 'typeorm';

export class MembershipRepository extends BaseRepository<Membership> {
  constructor(entityManager: EntityManager) {
    super(entityManager.getRepository(Membership));
  }
}

export const membershipRepo = new MembershipRepository(AppDataSource.manager);
