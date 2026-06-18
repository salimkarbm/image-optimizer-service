import Session from '../users/entities/session.entity';
import sessionRepo from '../../../infrastructure/repositories/user/session.repository';
import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';

export class SessionService {
  constructor(private readonly sessionRepository: typeof sessionRepo) {}

  async create(session: Partial<Session>): Promise<Session> {
    const newSession = this.sessionRepository.create(session);
    return await this.sessionRepository.save(newSession);
  }

  async findOne(options: FindOneOptions<Session>) {
    return this.sessionRepository.findOne(options);
  }

  async findAll(options?: FindManyOptions<Session>) {
    return this.sessionRepository.findAll(options);
  }

  async count(options?: FindOneOptions<Session>) {
    return this.sessionRepository.count(options);
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<Session>,
    partialEntity: Partial<Session>,
    returnEntity = true,
  ): Promise<Session | null | void> {
    return this.sessionRepository.findOneAndUpdate(
      where,
      partialEntity,
      returnEntity,
    );
  }

  async update(
    where: FindOptionsWhere<Session>,
    partialEntity: Partial<Session>,
  ) {
    return this.sessionRepository.update(where, partialEntity);
  }

  async remove(options: FindOptionsWhere<Session>) {
    return this.sessionRepository.delete(options);
  }

  async save(session: Session): Promise<Session> {
    return this.sessionRepository.save(session);
  }
}

const sessionsService = new SessionService(sessionRepo);
export default sessionsService;
