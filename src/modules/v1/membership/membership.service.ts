import { EntityManager } from 'typeorm';
import { SystemRole } from '../roles/entities/roles.entity';
import { Membership } from './entities/members.entity';
import { membershipRepo } from '../../../infrastructure/repositories/membership.repository';
import rolesService, { RolesService } from '../roles/roles.service';
import AppError from '../../../shared/utils/errors/appError';
import { STATUS_CODE } from '../../../shared/constants';

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
      roleId: ownerRole.id,
    });

    return manager.save(membership);
  }
}

const membershipService = new MembershipService(rolesService, membershipRepo);
export default membershipService;
