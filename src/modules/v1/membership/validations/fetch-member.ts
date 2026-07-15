import validator from 'validator';
import xss from 'xss';
import { z } from 'zod';

export const GetMembershipSchema = z.object({
  membershipId: z.string().nonempty().min(3).max(50),
  organizationId: z.string().nonempty().min(3).max(50),
});

export const GetMembershipSchemaRules: Record<
  string,
  Array<'trim' | 'escape' | 'xss'>
> = {
  membershipId: ['trim', 'escape', 'xss'],
  organizationId: ['trim', 'escape', 'xss'],
};
