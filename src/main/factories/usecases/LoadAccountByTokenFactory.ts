import env from '@main/config/env';
import { ILoadAccountByToken } from '@domain/usecases';
import { DbLoadAccountByToken } from '@data/usecases';
import { AccountMongoRepository } from '@infra/db';
import { JwtAdapter } from '@infra/cryptography';

export const makeDbLoadAccountByToken = (): ILoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository);
};
