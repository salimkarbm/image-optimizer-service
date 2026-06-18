import { JwtPayload } from 'jsonwebtoken';
import { Membership } from '../../../modules/v1/membership/entities/members.entity';
import { Organization } from '../../../modules/v1/organization/entities/organization.entity';
import User from '../../../modules/v1/users/entities/user.entity';

export interface RequestContext {
  user: User;
  organization: Organization;
  membership: Membership;
}

interface _JwtPayload extends JwtPayload {
  sub: string;
}
