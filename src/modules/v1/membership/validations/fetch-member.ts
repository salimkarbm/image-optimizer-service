import validator from 'validator';
import xss from 'xss';
import { z } from 'zod';

export const GetMembershipSchema = z.object({
  membershipId: z.string().nonempty().min(3).max(50),
  // .transform((val) => validator.escape(val)) // escapes <, >, &, ", '
  // .transform((val) => xss(val)), // strips disallowed HTML
});

export const GetMembershipSchemaRules: Record<
  string,
  Array<'trim' | 'escape' | 'xss'>
> = {
  membershipId: ['trim', 'escape', 'xss'],
};
