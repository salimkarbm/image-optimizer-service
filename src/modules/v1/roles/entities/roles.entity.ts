import BaseEntity from '../../../../infrastructure/repositories/base.entity';
import { Column, Entity } from 'typeorm';

export enum SystemRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER',
}

export const ROLE_PRIORITY = {
  OWNER: 4,
  ADMIN: 3,
  EDITOR: 2,
  VIEWER: 1,
} as const;
@Entity({ name: 'roles', schema: 'public' })
export class Role extends BaseEntity {
  @Column({ unique: true })
  key!: string; // e.g. 'owner', 'admin', 'editor', 'viewer'

  @Column({ unique: true })
  name!: string; // e.g. 'Owner', 'Admin', 'Editor', 'Viewer'

  @Column({ default: false })
  isSystem!: boolean;

  @Column({ type: 'boolean', default: false })
  isDefault!: boolean; // auto-assigned to new users

  @Column({ type: 'boolean', default: false })
  isSuperAdmin!: boolean; // bypasses all permission checks
}
