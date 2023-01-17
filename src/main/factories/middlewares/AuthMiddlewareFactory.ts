import { makeDbLoadAccountByToken } from '@main/factories';
import { IMiddleware } from '@presentation/protocols';
import { AuthMiddleware } from '@presentation/middlewares';

export const makeAuthMiddleware = (role?: string): IMiddleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role);
};
