import { SystemRole } from '../../../../shared/enums/system-role.enum';
import validator from 'validator';
import xss from 'xss';
import { z } from 'zod';

export const updateRoleSchema = z.object({
  role: z.enum(SystemRole),
  membershipId: z.string().nonempty().min(3).max(50),
  organizationId: z.string().nonempty().min(3).max(50),
  // .transform((val) => validator.escape(val)) // escapes <, >, &, ", '
  // .transform((val) => xss(val)), // strips disallowed HTML
});

export const updateRoleSchemaRules: Record<
  string,
  Array<'trim' | 'escape' | 'xss'>
> = {
  role: ['trim', 'escape', 'xss'],
  membershipId: ['trim', 'escape', 'xss'],
  organizationId: ['trim', 'escape', 'xss'],
};
