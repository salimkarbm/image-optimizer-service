import { SystemRole } from '../../../../shared/enums/system-role.enum';

export interface CreateInvitationDto {
  email: string;
  role: SystemRole;
}

import { z } from 'zod';

export const CreateInvitationSchema = z.object({
  role: z.enum(SystemRole),
  email: z.email(),
});

export const CreateInvitationSchemaRules: Record<
  string,
  Array<'trim' | 'escape' | 'xss' | 'toLowerCase'>
> = {
  email: ['trim', 'escape', 'xss', 'toLowerCase'],
  role: ['trim', 'escape', 'xss'],
};

export const GetTokenSchema = z.object({
  token: z.string().nonempty(),
});

export const GetTokenSchemaRules: Record<
  string,
  Array<'trim' | 'escape' | 'xss'>
> = {
  token: ['trim', 'escape', 'xss'],
};
