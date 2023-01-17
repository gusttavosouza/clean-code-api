import { ExpressMiddlewareAdapter } from '@main/adapters';
import { makeAuthMiddleware } from '@main/factories';

export const adminAuth = ExpressMiddlewareAdapter(makeAuthMiddleware('admin'));
