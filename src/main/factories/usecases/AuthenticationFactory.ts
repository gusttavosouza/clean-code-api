import env from '@main/config/env';
import { AccountMongoRepository } from '@infra/db';
import { BcryptAdapter, JwtAdapter } from '@infra/cryptography';
import { DbAuthentication } from '@data/usecases';
import { IAuthentication } from '@domain/usecases';

export const makeDbAuthentication = (): IAuthentication => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository,
  );
};
