import User from './entities/user.entity';
import userRepo from '../../../infrastructure/repositories/user/user.repository';
import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';

export class UserService {
  constructor(private readonly userRepository: typeof userRepo) {}

  async create(user: User): Promise<User> {
    const saved = this.userRepository.create(user);
    return this.userRepository.save(saved);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async findByEmailOrUsername(
    email?: string,
    username?: string,
  ): Promise<User | null> {
    return this.userRepository.findOne({
      where: [{ email: email?.toLowerCase() }, { username }],
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async remove(options: FindOptionsWhere<User>) {
    return this.userRepository.delete(options);
  }

  async findOne(options: FindOneOptions<User>) {
    return this.userRepository.findOne(options);
  }

  async findAll(options?: FindManyOptions<User>) {
    return this.userRepository.findAll(options);
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<User>,
    partialEntity: Partial<User>,
    returnEntity = true,
  ) {
    return this.userRepository.findOneAndUpdate(
      where,
      partialEntity,
      returnEntity,
    );
  }

  async count(options?: FindOneOptions<User>) {
    return this.userRepository.count(options);
  }

  async update(where: FindOptionsWhere<User>, partialEntity: Partial<User>) {
    return this.userRepository.update(where, partialEntity);
  }
}

const userService = new UserService(userRepo);
export default userService;
