import DbAddAccount from '@data/usecases/Account/AddAccount/DbAddAccount';
import { BcryptAdapter } from '@infra/criptography/BcryptAdapter/BcryptAdapter';
import { AccountMongoRepository } from '@infra/db/mongodb/Account/AccountMongoRepository';

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
