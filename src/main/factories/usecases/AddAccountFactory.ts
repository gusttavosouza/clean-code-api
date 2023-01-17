import { DbAddAccount } from '@data/usecases';
import { IAddAccount } from '@domain/usecases';
import { AccountMongoRepository } from '@infra/db';
import { BcryptAdapter } from '@infra/cryptography';

export const makeDbAddAccount = (): IAddAccount => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbAddAccount(
    bcryptAdapter,
    accountMongoRepository,
    accountMongoRepository,
  );
};
