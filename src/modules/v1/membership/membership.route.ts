import { Router } from 'express';
import { authenticate } from '../../../middleware/authentication.middleware';
import { listMembers } from './membership.controller';
import { loadOrganization } from '../../../middleware/load-organization.middleware';

const router = Router();

router.route('/members').get(authenticate, loadOrganization, listMembers);

export default router;
