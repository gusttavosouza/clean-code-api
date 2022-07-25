import { ExpressMiddlewareAdapter } from '@main/adapters/ExpressMiddlewareAdapter';
import { makeAuthMiddleware } from '@main/factories/middlewares/AuthMiddleware';

export const adminAuth = ExpressMiddlewareAdapter(makeAuthMiddleware('admin'));
