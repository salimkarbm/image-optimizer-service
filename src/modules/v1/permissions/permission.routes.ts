import { Router } from 'express';
import { validateInputWithZod } from '../../../middlewares';
import {
  createPermissionSchema,
  createPermissionSchemaRules,
} from './validations/create.validation';
import { createPermission } from './permissions.controller';

const router = Router();

router.post(
  '/permissions',
  validateInputWithZod(createPermissionSchema, createPermissionSchemaRules),
  createPermission,
);

export default router;
