import { z } from 'zod';

export const resendOtpSchema = z.object({
  email: z.email(),
});

export const resendOtpSchemaRules: Record<
  string,
  Array<'trim' | 'escape' | 'xss'>
> = {
  email: ['trim', 'escape', 'xss'],
};
