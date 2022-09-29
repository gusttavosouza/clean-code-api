import { Router } from 'express';
import { AdapterExpressRoute } from '@main/adapters/ExpressRouteAdapter';
import {
  makeSignUpController,
  makeLoginController,
} from '@main/factories/controllers';

export default (router: Router): void => {
  router.post('/signup', AdapterExpressRoute(makeSignUpController()));
  router.post('/login', AdapterExpressRoute(makeLoginController()));
};
