import { Router } from 'express';
import { AdapterExpressRoute } from '@main/adapters/ExpressRouteAdapter';
import { auth } from '@main/middlewares/Auth';
import { makeSaveSurveyResultsController } from '@main/factories/controllers/SurveyResults/SaveSurveyResults/SaveSurveyResultsControllerFactory';
import { makeLoadSurveyResultsController } from '@main/factories/controllers/SurveyResults/LoadSurveyResults/LoadSurveyResultsControllerFactory';

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
