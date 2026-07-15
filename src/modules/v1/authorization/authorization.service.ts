import AppError from '../../../shared/utils/errors/appError';
import { STATUS_CODE } from '../../../shared/constants';
import { SystemRole } from '../../../shared/enums/system-role.enum';
import { ROLE_PERMISSIONS } from './role-permissions';
import { Permission } from '../../../shared/enums/permission.enum';
import { ROLE_PRIORITY } from './roles';

export class AuthorizationService {
  constructor() {}

  hasPermission(role: SystemRole, permission: Permission): boolean {
    const permissions = ROLE_PERMISSIONS[role] ?? [];

    return permissions.includes(permission);
  }

  requirePermission(role: SystemRole, permission: Permission): void {
    const allowed = this.hasPermission(role, permission);

    if (!allowed) {
      throw new AppError('Insufficient permissions', STATUS_CODE.FORBIDDEN);
    }
  }

  isOwner(role: SystemRole): boolean {
    return role === SystemRole.OWNER;
  }

  canManageRole(actorRole: SystemRole, targetRole: SystemRole): boolean {
    return ROLE_PRIORITY[actorRole] > ROLE_PRIORITY[targetRole];
  }

  requireRoleManagement(actorRole: SystemRole, targetRole: SystemRole): void {
    if (!this.canManageRole(actorRole, targetRole)) {
      throw new AppError('Cannot manage this role', STATUS_CODE.FORBIDDEN);
    }
  }

  canTransferOwnership(actorRole: SystemRole): boolean {
    return actorRole === SystemRole.OWNER;
  }

  canDeleteAsset(role: SystemRole): boolean {
    return this.hasPermission(role, Permission.ASSET_DELETE);
  }

  // async hasPermission(
  //   role: SystemRole,
  //   permission: Permission,
  // ): Promise<boolean> {
  // const rolePermissions: Pick<RolePermission, 'permissionId'>[] =
  // await rolePermissionsRepo.findAll({
  //   where: {
  //     roleId: role.toLowerCase(),
  //   },
  //   select: {
  //     permissionId: true,
  //   },
  // });
  // // Extract just the IDs into a string[]
  // const permissionIds: Permission['id'][] = rolePermissions.map(
  //   (rp) => rp.permissionId,
  // );
  // return permissionIds.includes(permission);
  //}

  /*
   Sync version if you cache permissions at login
   Best for middleware — no async DB hit per request.
  */

  // When user logs in, load all permission names once
  //const userPermissions = new Set<string>(['users.read', 'orgs.write']); // from DB

  // hasPermission(
  //   userPermissions: Set<string>,
  //   permission: string
  // ): boolean {
  //   return userPermissions.has(permission);
  // }

  // // In middleware
  // if (!hasPermission(req.user.permissions, 'users.delete')) {
  //   throw new ForbiddenException();
  // }

  /*
    If you have roleName instead of roleId
  */
  // async hasPermission(
  //   roleName: string,
  //   permissionName: string
  // ): Promise<boolean> {
  //   const exists = await this.dataSource
  //     .getRepository(RolePermission)
  //     .createQueryBuilder("rp")
  //     .innerJoin(Role, "role", "role.id = rp.roleId")
  //     .innerJoin(Permission, "perm", "perm.id = rp.permissionId")
  //     .where("role.name = :roleName", { roleName })
  //     .andWhere("perm.name = :permissionName", { permissionName })
  //     .getExists(); // TypeORM 0.3+

  //   return exists;
  // }

  /*
     If you need to query the DB using RolePermission
  */
  // async hasPermission(
  //     roleId: string,
  //     permissionName: string
  //   ): Promise<boolean> {
  //     const count = await this.dataSource
  //       .getRepository(RolePermission)
  //       .createQueryBuilder("rp")
  //       .innerJoin(Role, "role", "role.id = rp.roleId")
  //       .innerJoin(Permission, "perm", "perm.id = rp.permissionId")
  //       .where("role.id = :roleId", { roleId })
  //       .andWhere("perm.name = :permissionName", { permissionName })
  //       .getCount();

  //     return count > 0;
  //   }
  // }

  // // Usage
  // const canDelete = await permissionService.hasPermission(userRoleId, 'users.delete');

  /*
If you already have permissions on the role object
This is fastest — no DB call. Assumes your SystemRole has permissions: Permission[] or rolePermissions loaded.
*/

  // type Permission = { id: string; name: string };
  // hasPermission(
  //   role: SystemRole & { permissions: Permission[] },
  //   permission: Permission
  // ): boolean {
  //   return role.permissions.some(p => p.id === permission.id || p.name === permission.name);
  // }

  // async hasPermission(
  //   roleName: SystemRole | string,
  //   permission: Permission | string,
  // ): Promise<boolean> {
  //   const exists = await rolePermissionsRepo
  //     .createQueryBuilder('rp')
  //     .innerJoin(Role, 'role', 'role.id = rp.roleId')
  //     .innerJoin(Permission, 'perm', 'perm.id = rp.permissionId')
  //     .where('role.name = :roleName', { roleName })
  //     .andWhere('perm.name = :permissionName', { permissionName: permission })
  //     .getExists(); // TypeORM 0.3+
  //   return exists;
  // }
}

const authorizationService = new AuthorizationService();
export default authorizationService;
