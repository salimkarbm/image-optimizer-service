import { z } from 'zod';

export const createRoleSchema = z.object({
  key: z.string().nonempty().min(3).max(50).toLowerCase(),
  name: z.string().nonempty().min(3).max(50).toLowerCase(),
});

export const createRoleSchemaRules: Record<
  string,
  Array<'trim' | 'escape' | 'xss'>
> = {
  key: ['trim', 'escape', 'xss'],
  name: ['trim', 'escape', 'xss'],
};
