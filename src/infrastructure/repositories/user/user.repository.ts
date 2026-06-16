import { EntityManager } from 'typeorm';
import User from '../../../modules/v1/users/entities/user.entity';
import BaseRepository from '../../../shared/libs/base.repository';
import { AppDataSource } from '../../../config/database/typeorm.config';

export class UserRepository extends BaseRepository<User> {
  constructor(entityManager: EntityManager) {
    super(entityManager.getRepository(User));
  }
}
const userRepo = new UserRepository(AppDataSource.manager);
export default userRepo;
