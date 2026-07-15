import { Router } from 'express';
import { authenticate } from '../../../middleware/authentication.middleware';
import { authorize } from '../../../middleware/authorization.middleware';
import { loadMembership } from '../../../middleware/load-membership.middleware';
import { loadOrganization } from '../../../middleware/load-organization.middleware';
import authorizationService from '../authorization/authorization.service';
import { Permission } from '../../../shared/enums/permission.enum';
import {
  acceptInvitation,
  cancelInvitation,
  createInvitation,
  listInvitations,
} from './invitation.controller';
import { validateInputWithZod } from '../../../middleware';
import {
  CreateInvitationSchema,
  CreateInvitationSchemaRules,
  GetTokenSchema,
  GetTokenSchemaRules,
} from './validation/create-invitation';

const router = Router();

router.post(
  '/organizations/:organizationId/invitations',
  validateInputWithZod(CreateInvitationSchema, CreateInvitationSchemaRules),

  authenticate,

  loadOrganization,

  loadMembership,

  authorize(authorizationService, Permission.MEMBER_INVITE),

  createInvitation,
);

router.post(
  '/invitations/:token/accept',

  validateInputWithZod(GetTokenSchema, GetTokenSchemaRules),

  authenticate,

  acceptInvitation,
);

router.get(
  '/organizations/:organizationId/invitations',

  authenticate,

  loadOrganization,

  loadMembership,

  authorize(authorizationService, Permission.MEMBER_INVITE),

  listInvitations,
);

router.delete(
  '/organizations/:organizationId/invitations/:invitationId',

  authenticate,

  loadOrganization,

  loadMembership,

  authorize(authorizationService, Permission.MEMBER_INVITE),

  cancelInvitation,
);

export default router;
