import {
  IUpdateAccessTokenRepository,
  ILoadAccountByEmailRepository,
  IAddAccountRepository,
} from '@data/interfaces/db/Account';
import { ILoadAccountByTokenRepository } from '@data/interfaces/db/Account/ILoadAccountByTokenRepository';
import { AccountModel } from '@domain/models/Account';
import { AddAccountModel } from '@domain/usecases/Account/AddAccount';

import { MongoHelper } from '../helpers/MongoHelper';

export class AccountMongoRepository
  implements
    IAddAccountRepository,
    ILoadAccountByEmailRepository,
    IUpdateAccessTokenRepository,
    ILoadAccountByTokenRepository
{
  public async loadByToken(
    token: string,
    role?: string,
  ): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({
      accessToken: token,
      $or: [
        {
          role,
        },
        {
          role: 'admin',
        },
      ],
    });
    return account && MongoHelper.mapper(account);
  }

  public async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);
    return MongoHelper.mapper(result.ops[0]);
  }

  public async loadByEmail(email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({ email });
    return account && MongoHelper.mapper(account);
  }

  public async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.updateOne(
      { _id: id },
      {
        $set: {
          accessToken: token,
        },
      },
    );
  }
}
