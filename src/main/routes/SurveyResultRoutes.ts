import { Router } from 'express';

import {
  makeSaveSurveyResultController,
  makeLoadSurveyResultController,
} from '@main/factories';
import { ExpressRouteAdapter } from '@main/adapters';
import { auth } from '@main/middlewares';

export default (router: Router): void => {
  router.put(
    '/surveys/:surveyId/results',
    auth,
    ExpressRouteAdapter(makeSaveSurveyResultController()),
  );
  router.get(
    '/surveys/:surveyId/results',
    auth,
    ExpressRouteAdapter(makeLoadSurveyResultController()),
  );
};
