import { DbAddAccount } from '@data/usecases';
import { BcryptAdapter } from '@infra/criptography/BcryptAdapter';
import { AccountMongoRepository } from '@infra/db/mongodb';

export const makeDbAddAccount = (): DbAddAccount => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();

  return new DbAddAccount(
    bcryptAdapter,
    accountMongoRepository,
    accountMongoRepository,
  );
};
