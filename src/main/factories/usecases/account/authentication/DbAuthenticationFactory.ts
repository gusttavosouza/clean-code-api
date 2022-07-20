import { DbAuthentication } from '@data/usecases/Authentication/DbAuthentication';
import { BcryptAdapter } from '@infra/criptography/BcryptAdapter/BcryptAdapter';
import { AccountMongoRepository } from '@infra/db/mongodb/AccountRepository/AccountRepository';
import { JwtAdapter } from '@infra/criptography/JwtAdapter/JwtAdapter';
import env from '@main/config/env';
import { IAuthentication } from '@domain/usecases/IAuthentication';

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
