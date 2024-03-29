import { ExpressMiddlewareAdapter } from '@main/adapters';
import { makeAuthMiddleware } from '@main/factories';

export const auth = ExpressMiddlewareAdapter(makeAuthMiddleware());
