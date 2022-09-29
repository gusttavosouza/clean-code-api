import { Router } from 'express';
import { AdapterExpressRoute } from '@main/adapters/ExpressRouteAdapter';
import { auth } from '@main/middlewares/Auth';
import {
  makeSaveSurveyResultsController,
  makeLoadSurveyResultsController,
} from '@main/factories/controllers';

export default (router: Router): void => {
  router.put(
    '/surveys/:surveyId/results',
    auth,
    AdapterExpressRoute(makeSaveSurveyResultsController()),
  );
  router.get(
    '/surveys/:surveyId/results',
    auth,
    AdapterExpressRoute(makeLoadSurveyResultsController()),
  );
};
