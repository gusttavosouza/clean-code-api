import { IMiddleware } from '@presentation/interfaces';
import { makeDbLoadAccountByToken } from '@main/factories/usecases';
import { AuthMiddleware } from '@presentation/middlewares';

export const makeAuthMiddleware = (role?: string): IMiddleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role);
};
