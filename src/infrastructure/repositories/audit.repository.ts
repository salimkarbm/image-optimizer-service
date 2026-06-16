import BaseRepository from '../../shared/libs/base.repository';
import { EntityManager } from 'typeorm';
import { AuditLog } from '../../modules/v1/audit/entities/audit.entity';
import { AppDataSource } from '../../config/database/typeorm.config';

export class AuditRepository extends BaseRepository<AuditLog> {
  constructor(entityManager: EntityManager) {
    super(entityManager.getRepository(AuditLog));
  }
}

export const auditRepo = new AuditRepository(AppDataSource.manager);
