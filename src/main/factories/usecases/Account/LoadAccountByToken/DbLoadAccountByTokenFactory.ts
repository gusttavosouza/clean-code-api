import { ILoadAccountByToken } from '@domain/usecases/Account/LoadAccountByToken';
import { JwtAdapter } from '@infra/criptography/JwtAdapter/JwtAdapter';
import { AccountMongoRepository } from '@infra/db/mongodb/Account/AccountMongoRepository';
import env from '@main/config/env';
import { DbLoadAccountByToken } from '@data/usecases/Account/LoadAccountByToken/DbLoadAccountByToken';

export const makeDbLoadAccountByToken = (): ILoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository);
};
