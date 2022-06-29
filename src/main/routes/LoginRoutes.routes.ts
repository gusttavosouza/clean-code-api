import { Router } from 'express';
import { AdapterExpressRoute } from '@main/adapters/express/ExpressRouteAdapter';
import { makeSignUpController } from '@main/factories/SignUp/SignUp';

export default (router: Router): void => {
  router.post('/signup', AdapterExpressRoute(makeSignUpController()));
};