import { Router } from 'express';
import { ExpressRouteAdapter } from '@main/adapters';
import { makeSignUpController, makeLoginController } from '@main/factories';

export default (router: Router): void => {
  router.post('/signup', ExpressRouteAdapter(makeSignUpController()));
  router.post('/login', ExpressRouteAdapter(makeLoginController()));
};
