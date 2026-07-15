import { Router } from 'express';
import { validateInputWithZod } from '../../../middleware';
import {
  createRoleSchema,
  createRoleSchemaRules,
} from './validations/create-role.validation';
import { createRole, getAllRoles } from './roles.controller';

const router = Router();

router
  .route('/roles')
  .post(
    validateInputWithZod(createRoleSchema, createRoleSchemaRules),
    createRole,
  )
  .get(getAllRoles);

export default router;
