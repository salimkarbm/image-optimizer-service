import { Router } from 'express';
import { signUp, verifyEmail } from '../../../auth/controllers';
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
  verifyEmail,
);

export default router;
