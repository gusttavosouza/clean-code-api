import { Router } from 'express';

import { ExpressRouteAdapter } from '@main/adapters';
import {
  makeAddSurveyController,
  makeLoadSurveysController,
} from '@main/factories';
import { adminAuth, auth } from '@main/middlewares';

export default (router: Router): void => {
  router.post(
    '/surveys',
    adminAuth,
    ExpressRouteAdapter(makeAddSurveyController()),
  );
  router.get(
    '/surveys',
    auth,
    ExpressRouteAdapter(makeLoadSurveysController()),
  );
};
