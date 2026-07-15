import { Router } from 'express';
import { validateInputWithZod } from '../../../middleware';
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
  getAllRolePermissions,
} from './permission.controller';
import {
  fetchRolePermissionsQuerySchema,
  fetchRolePermissionsQuerySchemaRules,
} from './validations/filter.validation';

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
  )
  .get(
    validateInputWithZod(
      fetchRolePermissionsQuerySchema,
      fetchRolePermissionsQuerySchemaRules,
    ),
    getAllRolePermissions,
  );

export default router;
