import { Router } from 'express';
import { AdapterExpressRoute } from '@main/adapters/ExpressRouteAdapter';
import { makeLoadSurveysController } from '@main/factories/controllers/Survey/LoadSurveys/LoadSurveyControllerFactory';
import { makeAddSurveyController } from '@main/factories/controllers/Survey/AddSurvey/AddSurveyControllerFactory';
import { adminAuth } from '@main/middlewares/AdminAuth';
import { auth } from '@main/middlewares/Auth';

export default (router: Router): void => {
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
