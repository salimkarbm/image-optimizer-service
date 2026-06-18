import { rolePermissionsRepo } from 'src/infrastructure/repositories/role-permissions.repository';
import { Permission } from '../permissions/entities/permission.entity';
import { RolePermission } from '../permissions/entities/role-permissions.entity';

export class AuthorizationService {
  constructor() {}
  async hasPermission(
    roleId: RolePermission['roleId'],
    permission: Permission['id'],
  ): Promise<boolean> {
    const rolePermissions: Pick<RolePermission, 'permissionId'>[] =
      await rolePermissionsRepo.findAll({
        where: {
          roleId: roleId.toString(),
        },
        select: {
          permissionId: true,
        },
      });

    // Extract just the IDs into a string[]
    const permissionIds: Permission['id'][] = rolePermissions.map(
      (rp) => rp.permissionId,
    );

    return permissionIds.includes(permission);
  }
}

const authorizationService = new AuthorizationService();
export default authorizationService;
