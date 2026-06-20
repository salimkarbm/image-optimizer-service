import { Request } from 'express';
import { RequestContext } from '../types/request/request';

type Test = Request['user'];

export function getContext(req: Request): RequestContext {
  return {
    user: req.user!,
    organization: req.organization!,
    membership: req.membership!,
  };
}
