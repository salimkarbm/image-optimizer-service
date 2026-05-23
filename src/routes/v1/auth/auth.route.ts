import { Router } from 'express';
import { validateInputWithZod } from '../../../middlewares';
import { signUpSchema, signUpSchemaRules } from '../../../auth/validations';
import {
  verifyEmailSchema,
  verifyEmailSchemaRules,
} from '../../../auth/validations';
import {
  resendOtpSchema,
  resendOtpSchemaRules,
} from '../../../auth/validations/resend-otp.validation';
import {
  login,
  logout,
  logoutAll,
  refreshToken,
  resendOtp,
  signUp,
  verifyEmail,
} from '../../../controllers';
import {
  loginSchema,
  loginSchemaRules,
  logoutSchema,
  logoutSchemaRules,
  refreshSchema,
  refreshSchemaRules,
} from '../../../auth/validations/login.validation';

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
  validateInputWithZod(logoutSchema, logoutSchemaRules),
  logoutAll,
);

export default router;
