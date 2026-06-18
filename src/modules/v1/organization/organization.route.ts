import { Router } from 'express';
import { validateInputWithZod } from '../../../middlewares';
import { create, find, listByUser } from './organization.controller';
import {
  createOrganizationSchema,
  createOrganizationSchemaRules,
} from './validations/create-input.validation';
import { authenticate } from '../../../middlewares/authentication.middleware';
import {
  GetOrganizationSchema,
  GetOrganizationSchemaRules,
} from './validations/fetch-organization';

const router = Router();

router
  .route('/organizations')
  .post(
    validateInputWithZod(
      createOrganizationSchema,
      createOrganizationSchemaRules,
    ),
    authenticate,
    create,
  )
  .get(authenticate, listByUser);

router
  .route('/organizations/:organizationId')
  .get(
    validateInputWithZod(GetOrganizationSchema, GetOrganizationSchemaRules),
    authenticate,
    find,
  );
export default router;
