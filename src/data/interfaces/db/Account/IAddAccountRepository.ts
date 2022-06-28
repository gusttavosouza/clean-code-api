import { IAddAccountModel } from '../../../domain/usecases/AddAccount';
import { IAccountModel } from '../../../domain/models/Account';

export interface IAddAccountRepository {
  add(account: IAddAccountModel): Promise<IAccountModel>;
}
