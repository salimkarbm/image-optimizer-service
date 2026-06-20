import { Router } from 'express';
import { validateInputWithZod } from '../../../middlewares';
import {
  context,
  create,
  getOrganization,
  listByUser,
} from './organization.controller';
import {
  createOrganizationSchema,
  createOrganizationSchemaRules,
} from './validations/create-input.validation';
import { authenticate } from '../../../middlewares/authentication.middleware';
import {
  GetOrganizationSchema,
  GetOrganizationSchemaRules,
} from './validations/fetch-organization';
import { loadOrganization } from '../../../middlewares/load-organization.middleware';
import { loadMembership } from '../../../middlewares/load-membership.middleware';

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
    loadOrganization,
    loadMembership,
    getOrganization,
  );

router.get(
  '/organizations/:organizationId/context',
  validateInputWithZod(GetOrganizationSchema, GetOrganizationSchemaRules),
  authenticate,
  loadOrganization,
  loadMembership,
  context,
);
export default router;
