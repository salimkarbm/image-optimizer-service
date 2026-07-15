export enum Permission {
  ASSET_VIEW = 'asset:view',
  ASSET_CREATE = 'asset:create',
  ASSET_UPDATE = 'asset:update',
  ASSET_DELETE = 'asset:delete',

  MEMBER_INVITE = 'member:invite',
  MEMBER_REMOVE = 'member:remove',
  MEMBER_UPDATE_ROLE = 'member:update-role',

  ORGANIZATION_CREATE = 'organization:create',
  ORGANIZATION_UPDATE = 'organization:update',
  ORGANIZATION_DELETE = 'organization:delete',
  ORGANIZATION_INVITE = 'organization:invite',
  ORGANIZATION_REMOVE = 'organization:remove',
  ORGANIZATION_UPDATE_ROLE = 'organization:update-role',

  SETTINGS_UPDATE = 'settings:update',
}
