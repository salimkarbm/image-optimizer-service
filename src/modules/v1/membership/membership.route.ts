import { Router } from 'express';
import { authenticate } from '../../../middleware/authentication.middleware';
import {
  leaveOrganization,
  listMembers,
  removeMember,
  updateRole,
} from './membership.controller';
import { loadOrganization } from '../../../middleware/load-organization.middleware';
import { loadMembership } from '../../../middleware/load-membership.middleware';
import { validateInputWithZod } from '../../../middleware';
import {
  updateRoleSchema,
  updateRoleSchemaRules,
} from './validations/update-role';
import { authorize } from '../../../middleware/authorization.middleware';
import authorizationService from '../authorization/authorization.service';
import { Permission } from '../../../shared/enums/permission.enum';
import {
  GetMembershipSchema,
  GetMembershipSchemaRules,
} from './validations/fetch-member';
import {
  GetOrganizationSchema,
  GetOrganizationSchemaRules,
} from '../organization/validations/fetch-organization';

const router = Router();

router.route('/members').get(authenticate, loadOrganization, listMembers);

router
  .route('/organizations/:organizationId/members/:membershipId')
  .patch(
    validateInputWithZod(updateRoleSchema, updateRoleSchemaRules),
    authenticate,
    loadOrganization,
    loadMembership,
    authorize(authorizationService, Permission.MEMBER_UPDATE_ROLE),
    updateRole,
  )
  .delete(
    validateInputWithZod(GetMembershipSchema, GetMembershipSchemaRules),
    authenticate,
    loadOrganization,
    loadMembership,
    authorize(authorizationService, Permission.MEMBER_REMOVE),
    removeMember,
  );

router
  .route('/organizations/:organizationId/leave')
  .post(
    validateInputWithZod(GetOrganizationSchema, GetOrganizationSchemaRules),
    authenticate,
    loadOrganization,
    leaveOrganization,
  );

export default router;
