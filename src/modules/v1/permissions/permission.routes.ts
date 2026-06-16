import { Router } from 'express';
import { validateInputWithZod } from '../../../middlewares';
import {
  createPermissionSchema,
  createPermissionSchemaRules,
} from './validations/create.validation';
import { createPermission, getAllPermissions } from './permissions.controller';

const router = Router();

router
  .route('/permissions')
  .post(
    validateInputWithZod(createPermissionSchema, createPermissionSchemaRules),
    createPermission,
  )
  .get(getAllPermissions);

export default router;
