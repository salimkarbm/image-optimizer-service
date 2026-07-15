import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Role } from '../../roles/entities/roles.entity';
import { Permission } from './permission.entity';
import BaseEntity from '../../../../infrastructure/repositories/base.entity';

@Entity({ name: 'role_permissions', schema: 'public' })
export class RolePermission extends BaseEntity {
  @ManyToOne(() => Role)
  @JoinColumn({ name: 'roleId' })
  role!: Role;

  @Column({ type: 'uuid' })
  roleId!: string;

  @ManyToOne(() => Permission)
  @JoinColumn({ name: 'permissionId' })
  permission!: Permission;

  @Column({ type: 'uuid' })
  permissionId!: string;
}
