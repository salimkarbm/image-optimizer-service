import validator from 'validator';
import xss from 'xss';
import { z } from 'zod';

export const GetOrganizationSchema = z.object({
  organizationId: z.string().trim().toLowerCase().min(3).max(50),
  // .transform((val) => validator.escape(val)) // escapes <, >, &, ", '
  // .transform((val) => xss(val)), // strips disallowed HTML
});

export const GetOrganizationSchemaRules: Record<
  string,
  Array<'trim' | 'escape' | 'xss'>
> = {
  organizationId: ['trim', 'escape', 'xss'],
};
