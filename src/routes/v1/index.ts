import { Router } from 'express';
import healthRoute from '../../modules/v1/security/health.route';
import securityRoute from '../../modules/v1/security/security.route';
import authRoute from '../../modules/v1/auth/auth.route';
import permissionRoute from '../../modules/v1/permissions/permission.routes';
import roleRoute from '../../modules/v1/roles/role.routes';

const router = Router();

// auth routes
router.use(authRoute);

// health routes
router.use(healthRoute);

// security routes
router.use(securityRoute);

// Permission routes
router.use(permissionRoute);

// Role routes
router.use(roleRoute);

export default router;
