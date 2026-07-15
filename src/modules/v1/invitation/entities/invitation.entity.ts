import { Column, Entity } from 'typeorm';
import { SystemRole } from '../../../../shared/enums/system-role.enum';
import BaseEntity from '../../../../infrastructure/repositories/base.entity';

@Entity('organization_invitations')
export class Invitation extends BaseEntity {
  @Column('uuid')
  organizationId!: string;

  @Column()
  email!: string;

  @Column({
    type: 'enum',
    enum: SystemRole,
  })
  role!: SystemRole;

  @Column({
    unique: true,
  })
  token!: string;

  @Column('uuid')
  invitedBy!: string;

  @Column()
  expiresAt!: Date;

  @Column({
    nullable: true,
  })
  acceptedAt?: Date;
}
