import 'express';
import { User } from '../../modules/v1/users/entities/user.entity';
import { Organization } from '../../modules/v1/organization/entities/organization.entity';
import { Membership } from '../../modules/v1/membership/entities/members.entity';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
    organization?: Organization;
    membership?: Membership;
  }
}


export {};
