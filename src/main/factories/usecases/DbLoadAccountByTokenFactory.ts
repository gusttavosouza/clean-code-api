import { ILoadAccountByToken } from '@domain/usecases';
import { JwtAdapter } from '@infra/criptography';
import { AccountMongoRepository } from '@infra/db/mongodb';
import env from '@main/config/env';
import { DbLoadAccountByToken } from '@data/usecases';

export const makeDbLoadAccountByToken = (): ILoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository);
};
