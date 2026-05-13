import { EntityManager } from 'typeorm';
import BaseRepository from '../../libs/base/base.repository';
import OTP from '../../users/entities/otp.entity';

export default class OTPRepository extends BaseRepository<OTP> {
  constructor(entityManager: EntityManager) {
    super(entityManager.getRepository(OTP));
  }
}
