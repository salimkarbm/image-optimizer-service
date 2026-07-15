import { NextFunction, Request, Response } from 'express';
import { Permission } from '../shared/enums/permission.enum';
import { AuthorizationService } from '../modules/v1/authorization/authorization.service';
import { SystemRole } from '../shared/enums/system-role.enum';

//Very thin.That's intentional.
export const authorize =
  (authorizationService: AuthorizationService, permission: Permission) =>
  (req: Request, res: Response, next: NextFunction) => {
    authorizationService.requirePermission(
      req.membership!.role as SystemRole,
      permission,
    );

    next();
  };
