import { Entity, ManyToOne } from 'typeorm';
import { Role } from '../../roles/entities/roles.entity';
import { Permission } from './permission.entity';
import BaseEntity from '../../../../infrastructure/repositories/base.entity';

@Entity({ name: 'role_permissions', schema: 'public' })
export class RolePermission extends BaseEntity {
  @ManyToOne(() => Role)
  role!: Role;

  @ManyToOne(() => Permission)
  permission!: Permission;
}
