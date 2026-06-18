import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { Role } from '../../roles/entities/roles.entity';
import { Organization } from '../../organization/entities/organization.entity';
import User from '../../users/entities/user.entity';
import BaseEntity from '../../../../infrastructure/repositories/base.entity';

@Entity({ name: 'memberships', schema: 'public' })
@Unique(['user', 'organization'])
export class Membership extends BaseEntity {
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column({ type: 'uuid' })
  userId!: string;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'organizationId' })
  organization!: Organization;

  @Column({ type: 'uuid' })
  organizationId!: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'roleId' })
  role!: Role;

  @Column({ type: 'uuid' })
  roleId!: string;
}
