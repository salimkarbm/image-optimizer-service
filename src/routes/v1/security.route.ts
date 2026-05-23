import { Router } from 'express';
import {
  securityHeader,
  securityRecommendations,
} from '../../controllers/v1/security.controller';

const router = Router();

router.get('/security/info', securityRecommendations);
router.get('/security/headers', securityHeader);

export default router;
