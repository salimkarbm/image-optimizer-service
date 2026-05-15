import { Router } from 'express';
import { securityHeader, securityRecommendations } from '../../auth/controllers';

const router = Router();

router.get('/security/info', securityRecommendations);
router.get('/security/headers', securityHeader);

export default router;
