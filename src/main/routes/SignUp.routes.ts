import { Router } from 'express';
import { AdapterExpressRoute } from '../adapters/ExpressRouteAdapter';
import { makeSignUpController } from '../factories/SignUp/SignUp';

export default (router: Router): void => {
  router.post('/signup', AdapterExpressRoute(makeSignUpController()));
};
