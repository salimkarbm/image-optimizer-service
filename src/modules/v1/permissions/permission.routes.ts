import { Router } from 'express';
import { validateInputWithZod } from '../../../middlewares';
import {
  createPermissionSchema,
  createPermissionSchemaRules,
  createRolePermissionSchema,
  createRolePermissionSchemaRules,
} from './validations/create.validation';
import {
  createPermission,
  createRolePermission,
  getAllPermissions,
} from './permissions.controller';

const router = Router();

router
  .route('/permissions')
  .post(
    validateInputWithZod(createPermissionSchema, createPermissionSchemaRules),
    createPermission,
  )
  .get(getAllPermissions);

router
  .route('/role-permissions')
  .post(
    validateInputWithZod(
      createRolePermissionSchema,
      createRolePermissionSchemaRules,
    ),
    createRolePermission,
  );

export default router;
