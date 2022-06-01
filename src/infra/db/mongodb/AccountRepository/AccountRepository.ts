import { IAddAccountRepository } from '../../../../data/interfaces/IAddAccountRepository';
import { IAccountModel } from '../../../../domain/models/Account';
import { IAddAccountModel } from '../../../../domain/usecases/AddAccount';

import { MongoHelper } from '../helpers/MongoHelper';

export class AccountMongoRepository implements IAddAccountRepository {
  public async add(accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);
    return MongoHelper.mapper(result.ops[0]);
  }
}
