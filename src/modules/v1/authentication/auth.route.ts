import { Router } from 'express';
import { validateInputWithZod } from '../../../middlewares';
import { signUpSchema, signUpSchemaRules } from './validations';
import { verifyEmailSchema, verifyEmailSchemaRules } from './validations';
import {
  resendOtpSchema,
  resendOtpSchemaRules,
} from './validations/resend-otp.validation';
import {
  emailSchema,
  emailSchemaRules,
  loginSchema,
  loginSchemaRules,
  refreshSchema,
  refreshSchemaRules,
  resetPasswordSchema,
  resetPasswordSchemaRules,
  userIdSchema,
  userIdSchemaRules,
} from './validations/login.validation';
import {
  forgotPassword,
  login,
  logout,
  logoutAll,
  me,
  refreshToken,
  resendOtp,
  resetPassword,
  signUp,
  verifyEmail,
} from './auth.controller';
import { authenticate } from '../../../middlewares/authentication.middleware';
import { loadOrganization } from '../../../middlewares/load-organization.middleware';
import { loadMembership } from '../../../middlewares/load-membership.middleware';

const router = Router();

router.post(
  '/auth/sign-up',
  validateInputWithZod(signUpSchema, signUpSchemaRules),
  signUp,
);

router.post(
  '/auth/verify-email',
  validateInputWithZod(verifyEmailSchema, verifyEmailSchemaRules),
  verifyEmail,
);

router.post(
  '/auth/resend-otp',
  validateInputWithZod(resendOtpSchema, resendOtpSchemaRules),
  resendOtp,
);
router.post(
  '/auth/login',
  validateInputWithZod(loginSchema, loginSchemaRules),
  login,
);

router.post(
  '/auth/refresh-token',
  validateInputWithZod(refreshSchema, refreshSchemaRules),
  refreshToken,
);

router.post(
  '/auth/logout',
  validateInputWithZod(refreshSchema, refreshSchemaRules),
  logout,
);

router.post(
  '/auth/logout-all',
  validateInputWithZod(userIdSchema, userIdSchemaRules),
  logoutAll,
);

router.post(
  '/auth/forgot-password',
  validateInputWithZod(emailSchema, emailSchemaRules),
  forgotPassword,
);

router.post(
  '/auth/reset-password',
  validateInputWithZod(resetPasswordSchema, resetPasswordSchemaRules),
  resetPassword,
);

router.get('/auth/me', authenticate, me);

export default router;
