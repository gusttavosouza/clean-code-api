import { Router } from 'express';
import { AdapterExpressRoute } from '@main/adapters/ExpressRouteAdapter';
import { adminAuth } from '@main/middlewares/AdminAuth';
import { auth } from '@main/middlewares/Auth';
import {
  makeLoadSurveysController,
  makeAddSurveyController,
} from '@main/factories/controllers';

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
