import { IMiddleware } from '@presentation/interfaces';
import { makeDbLoadAccountByToken } from '@main/factories/usecases/Account/LoadAccountByToken/DbLoadAccountByTokenFactory';
import { AuthMiddleware } from '@presentation/middlewares/AuthMiddleware';

export const makeAuthMiddleware = (role?: string): IMiddleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role);
};
