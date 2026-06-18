import { z } from 'zod';

export const createOrganizationSchema = z.object({
  name: z.string().nonempty().min(3).max(50).toLowerCase(),
});

export const createOrganizationSchemaRules: Record<
  string,
  Array<'trim' | 'escape' | 'xss'>
> = {
  name: ['trim', 'escape', 'xss'],
};
