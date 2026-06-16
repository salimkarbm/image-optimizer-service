import { EntityManager } from 'typeorm';
import BaseRepository from '../../../shared/libs/base.repository';
import { AppDataSource } from '../../../config/database/typeorm.config';
import Session from '../../../modules/v1/users/entities/session.entity';

export class SessionRepository extends BaseRepository<Session> {
  constructor(entityManager: EntityManager) {
    super(entityManager.getRepository(Session));
  }
}

const sessionRepo = new SessionRepository(AppDataSource.manager);
export default sessionRepo;
