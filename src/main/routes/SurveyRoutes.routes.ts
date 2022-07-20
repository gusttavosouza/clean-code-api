import { Router } from 'express';
import { AdapterExpressRoute } from '@main/adapters/ExpressRouteAdapter';
import { ExpressMiddlewareAdapter } from '@main/adapters/ExpressMiddlewareAdapter';
import { makeAuthMiddleware } from '@main/factories/middlewares/AuthMiddleware';
import { makeAddSurveyController } from '../factories/controllers/Survey/AddSurvey/AddSurveyControllerFactory';

export default (router: Router): void => {
  const adminAuth = ExpressMiddlewareAdapter(makeAuthMiddleware('admin'));
  router.post(
    '/surveys',
    adminAuth,
    AdapterExpressRoute(makeAddSurveyController()),
  );
};
