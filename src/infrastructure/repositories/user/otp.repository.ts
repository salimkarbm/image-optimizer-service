import { EntityManager } from 'typeorm';
import OTP from '../../../modules/v1/user/entities/otp.entity';
import BaseRepository from '../../../shared/libs/base.repository';
import { AppDataSource } from '../../../config/database/typeorm.config';

export class OTPRepository extends BaseRepository<OTP> {
  constructor(entityManager: EntityManager) {
    super(entityManager.getRepository(OTP));
  }
}

const otpRepo = new OTPRepository(AppDataSource.manager);
export default otpRepo;
