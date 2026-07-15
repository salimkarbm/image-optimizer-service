import {
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
} from 'typeorm';
import { Membership } from './entities/members.entity';
import { membershipRepo } from '../../../infrastructure/repositories/membership.repository';
import rolesService, { RolesService } from '../roles/roles.service';
import AppError from '../../../shared/utils/errors/appError';
import { STATUS_CODE } from '../../../shared/constants';
import { PaginatedQuery } from '../../../shared/types';
import User from '../user/entities/user.entity';
import authorizationService, {
  AuthorizationService,
} from '../authorization/authorization.service';
import { SystemRole } from '../../../shared/enums/system-role.enum';
import { RequestContext } from '../../../shared/types/request/request';

export class MembershipService {
  constructor(
    private readonly roleService: RolesService,
    private readonly membershipRepository: typeof membershipRepo,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async createOwnerMembership(
    manager: EntityManager,
    userId: string,
    organizationId: string,
  ) {
    const ownerRole = await this.roleService.findOne({
      where: {
        name: SystemRole.OWNER,
      },
    });
    if (!ownerRole) {
      throw new AppError('Owner role not found', STATUS_CODE.NOT_FOUND);
    }
    const membership = manager.create(Membership, {
      userId,
      organizationId,
      role: SystemRole.OWNER,
    });

    return manager.save(membership);
  }

  async createMembership(
    manager: EntityManager,
    userId: string,
    organizationId: string,
    role: SystemRole,
  ) {
    const membership = manager.create(Membership, {
      userId,
      organizationId,
      role,
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

  async findMembershipByEmail(email: string, organizationId: string) {
    return await this.membershipRepository
      .createQueryBuilder('membership')
      .innerJoin(User, 'user', 'membership.userId = user.id')
      .where('user.email = :email', { email })
      .andWhere('membership.organizationId = :organizationId', {
        organizationId,
      })
      .getOne();
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

  async findById(membershipId: string) {
    return this.membershipRepository.findOne({
      where: {
        id: membershipId,
      },
    });
  }

  async listMembers(organizationId: string) {
    return this.membershipRepository
      .createQueryBuilder('membership')
      .leftJoinAndSelect(User, 'user', 'user.id = membership.userId')
      .where('membership.organizationId = :organizationId', { organizationId })
      .getMany();
  }

  async updateRole(
    ctx: RequestContext,
    membershipId: string,
    newRole: SystemRole,
  ) {
    const target = await this.findById(membershipId);

    if (!target) {
      throw new AppError('Membership not found', STATUS_CODE.NOT_FOUND);
    }

    if (target.organizationId !== ctx?.organization?.id) {
      throw new AppError('Membership not found', STATUS_CODE.NOT_FOUND);
    }

    this.authorizationService.requireRoleManagement(
      ctx?.membership?.role!,
      target.role,
    );

    if (newRole === SystemRole.OWNER) {
      throw new AppError('Use ownership transfer', STATUS_CODE.BAD_REQUEST);
    }
    target.role = newRole;

    return this.membershipRepository.save(target);
  }

  async removeMember(ctx: RequestContext, membershipId: string) {
    const target = await this.findById(membershipId);

    if (!target) {
      throw new AppError('Membership not found', STATUS_CODE.NOT_FOUND);
    }

    if (target.organizationId !== ctx?.organization?.id) {
      throw new AppError('Membership not found', STATUS_CODE.NOT_FOUND);
    }

    authorizationService.requireRoleManagement(
      ctx?.membership?.role!,
      target.role,
    );

    if (target.role === SystemRole.OWNER) {
      throw new AppError('Cannot remove owner', STATUS_CODE.BAD_REQUEST);
    }
    await this.remove(target);
  }

  // async leaveOrganization(ctx: RequestContext) {
  //   if (ctx.membership?.role === SystemRole.OWNER) {
  //     throw new AppError(
  //       'Cannot leave until ownership transferred',
  //       STATUS_CODE.FORBIDDEN,
  //     );
  //   }
  //   return this.membershipRepository.delete({
  //     organizationId: ctx.organization?.id,
  //     userId: ctx.user?.id,
  //   });
  // }

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

const membershipService = new MembershipService(
  rolesService,
  membershipRepo,
  authorizationService,
);
export default membershipService;
