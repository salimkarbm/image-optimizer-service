import {
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
} from 'typeorm';
import { SystemRole } from '../roles/entities/roles.entity';
import { Membership } from './entities/members.entity';
import { membershipRepo } from '../../../infrastructure/repositories/membership.repository';
import rolesService, { RolesService } from '../roles/roles.service';
import AppError from '../../../shared/utils/errors/appError';
import { STATUS_CODE } from '../../../shared/constants';
import { PaginatedQuery } from 'src/shared/types';

export class MembershipService {
  constructor(
    private readonly roleService: RolesService,
    private readonly membershipRepository: typeof membershipRepo,
  ) {}

  async createOwnerMembership(
    manager: EntityManager,
    userId: string,
    organizationId: string,
  ) {
    const ownerRole = await this.roleService.findOne({
      where: {
        name: SystemRole.OWNER.toLowerCase(),
      },
    });
    if (!ownerRole) {
      throw new AppError('Owner role not found', STATUS_CODE.NOT_FOUND);
    }
    const membership = manager.create(Membership, {
      userId,
      organizationId,
      roleId: ownerRole.id
    });

    return manager.save(membership);
  }

  async findMembership(userId: string, organizationId: string) {
    return this.findOne({
      where: {
        userId,
        organizationId,
      },
    });
  }

  async requireMembership(userId: string, organizationId: string) {
    const membership = await this.findMembership(userId, organizationId);

    if (!membership) {
      throw new AppError(
        'Not a member of organization',
        STATUS_CODE.UNAUTHORIZED,
      );
    }

    return membership;
  }

  async getUserMemberships(userId: string) {
    return this.findAll({
      where: {
        userId,
      },
    });
  }

  async create(permission: Partial<Membership>) {
    const newPermission = this.membershipRepository.create(permission);
    return await this.membershipRepository.save(newPermission);
  }

  async findOne(options: FindOneOptions<Membership>) {
    return this.membershipRepository.findOne(options);
  }

  async findAll(options?: FindManyOptions<Membership>) {
    return this.membershipRepository.findAll(options);
  }

  async count(options?: FindOneOptions<Membership>) {
    return this.membershipRepository.count(options);
  }

  async findPaginated(
    query: PaginatedQuery,
    options: FindManyOptions<Membership>,
  ) {
    return this.membershipRepository.findPaginated(query, options);
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<Membership>,
    partialEntity: Partial<Membership>,
    returnEntity = true,
  ): Promise<Membership | null | void> {
    return this.membershipRepository.findOneAndUpdate(
      where,
      partialEntity,
      returnEntity,
    );
  }

  async update(
    where: FindOptionsWhere<Membership>,
    partialEntity: Partial<Membership>,
  ) {
    return this.membershipRepository.update(where, partialEntity);
  }
  async remove(options: FindOptionsWhere<Membership>) {
    return this.membershipRepository.delete(options);
  }

  async softDelete(where: FindOptionsWhere<Membership>) {
    const res = await this.membershipRepository.softDelete(where);
    return {
      status: !!res.status,
    };
  }

  async save(membership: Membership): Promise<Membership> {
    return this.membershipRepository.save(membership);
  }
}

const membershipService = new MembershipService(rolesService, membershipRepo);
export default membershipService;
