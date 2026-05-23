import { EntityManager } from 'typeorm';
import OTP from '../../users/entities/otp.entity';
import BaseRepository from '../../libs/base.repository';
import { AppDataSource } from '../../config/typeorm.config';

export class OTPRepository extends BaseRepository<OTP> {
  constructor(entityManager: EntityManager) {
    super(entityManager.getRepository(OTP));
  }
}

const otpRepo = new OTPRepository(AppDataSource.manager);
export default otpRepo;
