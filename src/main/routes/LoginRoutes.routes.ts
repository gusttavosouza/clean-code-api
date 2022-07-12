import { Router } from 'express';
import { AdapterExpressRoute } from '@main/adapters/express/ExpressRouteAdapter';
import { makeSignUpController } from '@main/factories/controllers/SignUp/SignUpControllerFactory';
import { makeLoginController } from '@main/factories/controllers/Login/LoginControllerFactory';

export default (router: Router): void => {
  router.post('/signup', AdapterExpressRoute(makeSignUpController()));
  router.post('/login', AdapterExpressRoute(makeLoginController()));
};
