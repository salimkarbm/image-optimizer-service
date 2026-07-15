import { invitationRepo } from '../../../infrastructure/repositories/invitation.repository';
import authorizationService, {
  AuthorizationService,
} from '../authorization/authorization.service';
import membershipService, {
  MembershipService,
} from '../membership/membership.service';
// import { UserService } from '../user/users.service';
import { AppDataSource } from '../../../config/database/typeorm.config';
import { RequestContext } from 'src/shared/types/request/request';
import { CreateInvitationDto } from './validation/create-invitation';
import AppError from '../../../shared/utils/errors/appError';
import { STATUS_CODE } from '../../../shared/constants';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  IsNull,
} from 'typeorm';
import crypto from 'crypto';
import { addDays } from 'date-fns';
import permissionsService, {
  PermissionsService,
} from '../permission/permission.service';
import { Permission } from '../../../shared/enums/permission.enum';
import { SystemRole } from '../../../shared/enums/system-role.enum';
import { Invitation } from './entities/invitation.entity';
import { PaginatedQuery } from '../../../shared/types';

export class InvitationService {
  constructor(
    private readonly invitationRepository: typeof invitationRepo,
    private readonly membershipService: MembershipService,
    private readonly authorizationService: AuthorizationService,
    private readonly permissionsService: PermissionsService,
    // private readonly userService: UserService,
    private readonly dataSource: typeof AppDataSource,
  ) {}

  async createInvitation(ctx: RequestContext, dto: CreateInvitationDto) {
    const role = ctx?.membership?.role as SystemRole;

    if (!role) {
      throw new AppError('Membership has no role', STATUS_CODE.FORBIDDEN);
    }

    this.authorizationService.requirePermission(role, Permission.MEMBER_INVITE);

    this.authorizationService.requireRoleManagement(role, dto.role);

    const existingMembership =
      await this.membershipService.findMembershipByEmail(
        dto.email,
        ctx?.organization?.id.toString()!,
      );

    if (existingMembership) {
      throw new AppError(
        'User already belongs to organization',
        STATUS_CODE.BAD_REQUEST,
      );
    }
    const existingInvitation = await this.invitationRepository.findOne({
      where: {
        organizationId: ctx?.organization?.id,
        email: dto.email.toLowerCase(),
        acceptedAt: IsNull(),
      },
    });

    if (existingInvitation) {
      throw new AppError('Invitation already sent', STATUS_CODE.BAD_REQUEST);
    }

    const token = crypto.randomBytes(32).toString('hex');

    const invitation = this.invitationRepository.create({
      organizationId: ctx?.organization?.id,
      email: dto.email.toLowerCase(),
      role: dto.role,
      token,
      invitedBy: ctx?.user?.id,
      expiresAt: addDays(new Date(), 7),
    });
    await this.invitationRepository.save(invitation);
    // TODO:
    // emailService.sendInvitation(...)
    return invitation;
  }

  async accept(userId: string, token: string) {
    const invitation = await this.invitationRepository.findOne({
      where: {
        token,
      },
    });

    if (!invitation) {
      throw new AppError('Invitation not found', STATUS_CODE.NOT_FOUND);
    }

    if (invitation.expiresAt < new Date()) {
      throw new AppError('Invitation expired', STATUS_CODE.BAD_REQUEST);
    }

    if (invitation.acceptedAt) {
      throw new AppError(
        'Invitation already accepted',
        STATUS_CODE.BAD_REQUEST,
      );
    }

    await this.dataSource.transaction(async (manager) => {
      await this.membershipService.createMembership(
        manager,
        userId,
        invitation.organizationId,
        invitation.role,
      );

      invitation.acceptedAt = new Date();

      await manager.getRepository(Invitation).save(invitation);
    });
  }
  async findPendInvitations(organizationId: string) {
    return this.invitationRepository.findAll({
      where: {
        organizationId,
        acceptedAt: IsNull(),
      },
    });
  }

  async cancelInvitation(organizationId: string, email: string) {
    return this.invitationRepository.delete({
      organizationId,
      email,
      acceptedAt: IsNull(),
    });
  }

  async findInvitations(organizationId: string) {
    return this.invitationRepository.findAll({
      where: {
        organizationId,
      },
    });
  }

  async create(permission: Partial<Invitation>) {
    const invitation = this.invitationRepository.create(permission);
    return await this.invitationRepository.save(invitation);
  }

  async findOne(options: FindOneOptions<Invitation>) {
    return this.invitationRepository.findOne(options);
  }

  async findAll(options?: FindManyOptions<Invitation>) {
    return this.invitationRepository.findAll(options);
  }

  async count(options?: FindOneOptions<Invitation>) {
    return this.invitationRepository.count(options);
  }

  async findPaginated(
    query: PaginatedQuery,
    options: FindManyOptions<Invitation>,
  ) {
    return this.invitationRepository.findPaginated(query, options);
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<Invitation>,
    partialEntity: Partial<Invitation>,
    returnEntity = true,
  ): Promise<Invitation | null | void> {
    return this.invitationRepository.findOneAndUpdate(
      where,
      partialEntity,
      returnEntity,
    );
  }

  async update(
    where: FindOptionsWhere<Invitation>,
    partialEntity: Partial<Invitation>,
  ) {
    return this.invitationRepository.update(where, partialEntity);
  }
  async remove(options: FindOptionsWhere<Invitation>) {
    return this.invitationRepository.delete(options);
  }

  async softDelete(where: FindOptionsWhere<Invitation>) {
    const res = await this.invitationRepository.softDelete(where);
    return {
      status: !!res.status,
    };
  }

  async save(invitation: Invitation): Promise<Invitation> {
    return this.invitationRepository.save(invitation);
  }
}

export const invitationService = new InvitationService(
  invitationRepo,
  membershipService,
  authorizationService,
  permissionsService,
  // userService,
  AppDataSource,
);

export default invitationService;
