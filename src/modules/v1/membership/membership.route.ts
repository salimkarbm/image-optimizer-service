import { Router } from 'express';
import { authenticate } from '../../../middleware/authentication.middleware';
import { listMembers, updateRole } from './membership.controller';
import { loadOrganization } from '../../../middleware/load-organization.middleware';
import { loadMembership } from '../../../middleware/load-membership.middleware';
import { validateInputWithZod } from '../../../middleware';
import {
  updateRoleSchema,
  updateRoleSchemaRules,
} from './validations/update-role';

const router = Router();

router.route('/members').get(authenticate, loadOrganization, listMembers);

router
  .route('/organizations/:organizationId/members/:membershipId')
  .get(
    validateInputWithZod(updateRoleSchema, updateRoleSchemaRules),
    authenticate,
    loadOrganization,
    loadMembership,
    updateRole,
  );

export default router;
