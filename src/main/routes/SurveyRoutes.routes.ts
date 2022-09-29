import { Router } from 'express';
import { AdapterExpressRoute } from '@main/adapters';
import { adminAuth, auth } from '@main/middlewares';
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
