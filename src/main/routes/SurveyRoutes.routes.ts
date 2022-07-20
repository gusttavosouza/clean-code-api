import { Router } from 'express';
import { AdapterExpressRoute } from '@main/adapters/ExpressRouteAdapter';
import { makeAddSurveyController } from '../factories/controllers/Survey/AddSurvey/AddSurveyControllerFactory';

export default (router: Router): void => {
  router.post('/surveys', AdapterExpressRoute(makeAddSurveyController()));
};
