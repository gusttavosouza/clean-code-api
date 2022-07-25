import { Router } from 'express';
import { AdapterExpressRoute } from '@main/adapters/ExpressRouteAdapter';
import { ExpressMiddlewareAdapter } from '@main/adapters/ExpressMiddlewareAdapter';
import { makeAuthMiddleware } from '@main/factories/middlewares/AuthMiddleware';
import { makeLoadSurveysController } from '@main/factories/controllers/Survey/LoadSurveys/LoadSurveyControllerFactory';
import { makeAddSurveyController } from '@main/factories/controllers/Survey/AddSurvey/AddSurveyControllerFactory';

export default (router: Router): void => {
  const adminAuth = ExpressMiddlewareAdapter(makeAuthMiddleware('admin'));
  const auth = ExpressMiddlewareAdapter(makeAuthMiddleware());

  router.post(
    '/surveys',
    adminAuth,
    AdapterExpressRoute(makeAddSurveyController()),
  );
  router.get(
    '/surveys',
    auth,
    AdapterExpressRoute(makeLoadSurveysController()),
  );
};
