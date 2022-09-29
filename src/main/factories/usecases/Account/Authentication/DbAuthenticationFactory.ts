import { DbAuthentication } from '@data/usecases/Account/Authentication/DbAuthentication';
import { BcryptAdapter } from '@infra/criptography/BcryptAdapter';
import { AccountMongoRepository } from '@infra/db/mongodb/Account/AccountMongoRepository';
import { JwtAdapter } from '@infra/criptography/JwtAdapter';
import env from '@main/config/env';
import { IAuthentication } from '@domain/usecases/Account/Authentication';

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
