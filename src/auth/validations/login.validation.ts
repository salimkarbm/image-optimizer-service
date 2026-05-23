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

export const logoutSchema = z.object({
  userId: z.string(),
});

export const logoutSchemaRules: Record<
  string,
  Array<'trim' | 'escape' | 'xss'>
> = {
  userId: ['trim', 'escape', 'xss'],
};
