import { IAddAccountRepository } from '../../../../data/interfaces/IAddAccountRepository';
import { IAccountModel } from '../../../../domain/models/Account';
import { IAddAccountModel } from '../../../../domain/usecases/AddAccount';

import { MongoHelper } from '../helpers/MongoHelper';

export class AccountMongoRepository implements IAddAccountRepository {
  public async add(accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);
    const account = result.ops[0];
    const { _id, ...accountWithoutId } = account;
    return { ...accountWithoutId, id: _id };
  }
}
