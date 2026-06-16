import { Router } from 'express';
import { validateInputWithZod } from '../../../middlewares';
import {
  createRoleSchema,
  createRoleSchemaRules,
} from './validations/create-role.validation';
import { createRole } from './roles.controller';

const router = Router();

router.post(
  '/roles',
  validateInputWithZod(createRoleSchema, createRoleSchemaRules),
  createRole,
);

export default router;
