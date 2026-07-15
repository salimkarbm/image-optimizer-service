import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z
    .string({ message: 'Password is required' })
    .min(8, 'Password must be at least 8 characters long'),
  firstName: z.string({ message: 'First name is required' }),

  lastName: z.string({ message: 'Last name is required' }),
  username: z
    .string()
    .min(3)
    .max(50)
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores',
    ),
  otherName: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
});

export const signUpSchemaRules: Record<
  string,
  Array<'trim' | 'escape' | 'xss' | 'toLowerCase'>
> = {
  email: ['trim', 'escape', 'xss', 'toLowerCase'],
  password: ['trim', 'escape', 'xss'],
  firstName: ['trim', 'escape', 'xss', 'toLowerCase'],
  lastName: ['trim', 'escape', 'xss', 'toLowerCase'],
  otherName: ['trim', 'escape', 'xss', 'toLowerCase'],
  gender: ['trim', 'escape', 'xss'],
  username: ['trim', 'escape', 'xss'],
};
