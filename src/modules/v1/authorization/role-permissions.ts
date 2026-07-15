import { SystemRole } from '../../../shared/enums/system-role.enum';
import { Permission } from '../../../shared/enums/permission.enum';

export const ROLE_PERMISSIONS: Record<SystemRole, Permission[]> = {
  [SystemRole.OWNER]: [
    Permission.ASSET_VIEW,
    Permission.ASSET_CREATE,
    Permission.ASSET_UPDATE,
    Permission.ASSET_DELETE,
    Permission.MEMBER_INVITE,
    Permission.MEMBER_REMOVE,
    Permission.SETTINGS_UPDATE,
  ],

  [SystemRole.ADMIN]: [
    Permission.ASSET_VIEW,
    Permission.ASSET_CREATE,
    Permission.ASSET_UPDATE,
    Permission.ASSET_DELETE,
    Permission.MEMBER_INVITE,
    Permission.MEMBER_REMOVE,
  ],

  [SystemRole.EDITOR]: [
    Permission.ASSET_VIEW,
    Permission.ASSET_CREATE,
    Permission.ASSET_UPDATE,
  ],

  [SystemRole.VIEWER]: [Permission.ASSET_VIEW],
} as const;
