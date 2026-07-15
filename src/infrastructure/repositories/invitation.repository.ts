import { EntityManager } from 'typeorm';
import { AppDataSource } from '../../config/database/typeorm.config';
import { Invitation } from '../../modules/v1/invitation/entities/invitation.entity';
import BaseRepository from '../../shared/libs/base.repository';

export class InvitationRepository extends BaseRepository<Invitation> {
  constructor(entityManager: EntityManager) {
    super(entityManager.getRepository(Invitation));
  }
}

export const invitationRepo = new InvitationRepository(AppDataSource.manager);
