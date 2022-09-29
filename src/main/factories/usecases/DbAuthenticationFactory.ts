import { DbAuthentication } from '@data/usecases';
import { AccountMongoRepository } from '@infra/db/mongodb';
import { IAuthentication } from '@domain/usecases/Authentication';
import { BcryptAdapter } from '@infra/criptography/BcryptAdapter';
import { JwtAdapter } from '@infra/criptography/JwtAdapter';
import env from '@main/config/env';

export const makeDbAuthentication = (): IAuthentication => {
  const bcryptAdapter = new BcryptAdapter(env.salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository,
  );

  return dbAuthentication;
};
