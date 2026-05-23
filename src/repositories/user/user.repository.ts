import { EntityManager } from 'typeorm';
import User from '../../users/entities/user.entity';
import BaseRepository from '../../libs/base.repository';
import { AppDataSource } from '../../config/typeorm.config';

export class UserRepository extends BaseRepository<User> {
  constructor(entityManager: EntityManager) {
    super(entityManager.getRepository(User));
  }
}
const userRepo = new UserRepository(AppDataSource.manager);
export default userRepo;
