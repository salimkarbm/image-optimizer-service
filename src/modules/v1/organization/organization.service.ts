import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { organizationRepo } from '../../../infrastructure/repositories/organization.repository';
import { Organization } from './entities/organization.entity';
import { PaginatedQuery } from '../../../shared/types';
import { CreateOrganizationDto } from '../../../shared/types/organization/organization.types';
import { AppDataSource } from '../../../config/database/typeorm.config';
import membershipService, {
  MembershipService,
} from '../membership/membership.service';
import { Membership } from '../membership/entities/members.entity';
import { RequestContext } from '../../../shared/types/request/request';
import permissionsService, {
  PermissionsService,
} from '../permission/permission.service';
import { ROLE_PERMISSIONS } from '../authorization/role-permissions';

export class OrganizationsService {
  constructor(
    private readonly organizationRepository: typeof organizationRepo,
    private readonly dataSource: typeof AppDataSource,
    private readonly membershipService: MembershipService,
    private readonly permissionsService: PermissionsService,
  ) {}
  async createOrganization(cxt: RequestContext, dto: CreateOrganizationDto) {
    return this.dataSource.transaction(async (manager) => {
      const organization = manager.create(Organization, {
        name: dto.name,
      });

      await manager.save(organization);

      await this.membershipService.createOwnerMembership(
        manager,
        cxt.user!.id,
        organization.id,
      );

      return organization;
    });
  }

  async findOrganization(organizationId: string) {
    return await this.findOne({
      where: { id: organizationId },
    });
  }

  async getOrganizationContext(cxt: RequestContext) {
    return {
      user: cxt.user,
      organization: cxt.organization,
      membership: cxt.membership,
      permissions: ROLE_PERMISSIONS[cxt.membership?.role!] ?? [],
    };
  }

  async findById(id: string) {
    return this.findOne({
      where: { id },
    });
  }

  async findBySlug(slug: string) {
    return this.findOne({
      where: { slug },
    });
  }

  async getUserOrganizations(userId: string) {
    return this.organizationRepository
      .createQueryBuilder('org')
      .innerJoin(
        Membership,
        'membership',
        `
      membership.organizationId = org.id
      `,
      )
      .where(
        `
      membership.userId = :userId
      `,
        { userId },
      )
      .getMany();
  }

  async create(organization: Partial<Organization>) {
    const newPermission = this.organizationRepository.create(organization);
    return await this.organizationRepository.save(newPermission);
  }

  async findOne(options: FindOneOptions<Organization>) {
    return this.organizationRepository.findOne(options);
  }

  async findAll(options?: FindManyOptions<Organization>) {
    return this.organizationRepository.findAll(options);
  }

  async count(options?: FindOneOptions<Organization>) {
    return this.organizationRepository.count(options);
  }

  async findPaginated(
    query: PaginatedQuery,
    options: FindManyOptions<Organization>,
  ) {
    return this.organizationRepository.findPaginated(query, options);
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<Organization>,
    partialEntity: Partial<Organization>,
    returnEntity = true,
  ): Promise<Organization | null | void> {
    return this.organizationRepository.findOneAndUpdate(
      where,
      partialEntity,
      returnEntity,
    );
  }

  async update(
    where: FindOptionsWhere<Organization>,
    partialEntity: Partial<Organization>,
  ) {
    return this.organizationRepository.update(where, partialEntity);
  }
  async remove(options: FindOptionsWhere<Organization>) {
    return this.organizationRepository.delete(options);
  }

  async softDelete(where: FindOptionsWhere<Organization>) {
    const res = await this.organizationRepository.softDelete(where);
    return {
      status: !!res.status,
    };
  }

  async save(organization: Organization): Promise<Organization> {
    return this.organizationRepository.save(organization);
  }
}

const organizationService = new OrganizationsService(
  organizationRepo,
  AppDataSource,
  membershipService,
  permissionsService,
);
export default organizationService;
