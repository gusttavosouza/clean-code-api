import { ExpressMiddlewareAdapter } from '@main/adapters';
import { makeAuthMiddleware } from '@main/factories/middlewares/AuthMiddleware';

export const adminAuth = ExpressMiddlewareAdapter(makeAuthMiddleware('admin'));
