import { z } from 'zod';

export const createPermissionSchema = z.object({
  key: z.string().nonempty().min(3).max(50).toLowerCase(),
  action: z.string().nonempty().min(3).max(50).toLowerCase(),
  resource: z.string().nonempty().min(3).max(50).toLowerCase(),
  description: z.string().nonempty().max(250).toLowerCase().optional(),
});

export const createPermissionSchemaRules: Record<
  string,
  Array<'trim' | 'escape' | 'xss'>
> = {
  key: ['trim', 'escape', 'xss'],
  action: ['trim', 'escape', 'xss'],
  resource: ['trim', 'escape', 'xss'],
  description: ['trim', 'escape', 'xss'],
};

export const createRolePermissionSchema = z.object({
  roleId: z.string().nonempty(),
  permissionId: z.string().nonempty(),
});

export const createRolePermissionSchemaRules: Record<
  string,
  Array<'trim' | 'escape' | 'xss'>
> = {
  roleId: ['trim', 'escape', 'xss'],
  permissionId: ['trim', 'escape', 'xss'],
};
