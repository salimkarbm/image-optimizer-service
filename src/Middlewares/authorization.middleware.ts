import { NextFunction, Request, Response } from 'express';
import { Permission } from '../modules/v1/permissions/entities/permission.entity';
import { AuthorizationService } from '../modules/v1/authorization/authorization.service';
import { SystemRole } from '../modules/v1/roles/entities/roles.entity';

//Very thin.That's intentional.
export const authorize =
  (
    authorizationService: AuthorizationService,
    permission: Permission | string,
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    authorizationService.requirePermission(
      req.membership!.role.name as SystemRole,
      permission,
    );

    next();
  };
