import { z } from 'zod';

export const fetchRolePermissionsQuerySchema = z.object({
  limit: z.number().default(1),
  page: z.number().default(10),
  role: z.string().toLowerCase().optional(),
});

export const fetchRolePermissionsQuerySchemaRules: Record<
  string,
  Array<'trim' | 'escape' | 'xss'>
> = {
  limit: ['trim', 'escape', 'xss'],
  page: ['trim', 'escape', 'xss'],
  role: ['trim', 'escape', 'xss'],
};
