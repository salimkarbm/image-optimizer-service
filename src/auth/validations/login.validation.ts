import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const loginSchemaRules: Record<
  string,
  Array<'trim' | 'escape' | 'xss'>
> = {
  email: ['trim', 'escape', 'xss'],
  password: ['trim', 'escape', 'xss'],
};

export const refreshSchema = z.object({
  sessionId: z.string(),
  userId: z.string(),
});

export const refreshSchemaRules: Record<
  string,
  Array<'trim' | 'escape' | 'xss'>
> = {
  sessionId: ['trim', 'escape', 'xss'],
  userId: ['trim', 'escape', 'xss'],
};

export const userIdSchema = z.object({
  userId: z.string(),
});

export const userIdSchemaRules: Record<
  string,
  Array<'trim' | 'escape' | 'xss'>
> = {
  userId: ['trim', 'escape', 'xss'],
};

export const emailSchema = z.object({
  email: z.email(),
});

export const emailSchemaRules: Record<
  string,
  Array<'trim' | 'escape' | 'xss'>
> = {
  email: ['trim', 'escape', 'xss'],
};

export const resetPasswordSchema = z.object({
  email: z.email(),
  otp: z.string().min(6, 'OTP must be at least 6 characters long'),
  newPassword: z
    .string()
    .min(6, 'New password must be at least 6 characters long'),
});

export const resetPasswordSchemaRules: Record<
  string,
  Array<'trim' | 'escape' | 'xss'>
> = {
  email: ['trim', 'escape', 'xss'],
  otp: ['trim', 'escape', 'xss'],
  newPassword: ['trim', 'escape', 'xss'],
};
