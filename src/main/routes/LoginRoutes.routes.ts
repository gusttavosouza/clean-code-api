import { Router } from 'express';
import { AdapterExpressRoute } from '@main/adapters/express/ExpressRouteAdapter';
import { makeSignUpController } from '@main/factories/SignUp/SignUp';
import { makeLoginController } from '@main/factories/Login/LoginFactory';

export default (router: Router): void => {
  router.post('/signup', AdapterExpressRoute(makeSignUpController()));
  router.post('/login', AdapterExpressRoute(makeLoginController()));
};
