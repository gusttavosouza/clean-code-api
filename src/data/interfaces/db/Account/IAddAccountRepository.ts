import { AddAccountModel } from '@domain/usecases/Account/AddAccount';
import { AccountModel } from '@domain/models/Account';

export interface IAddAccountRepository {
  add(account: AddAccountModel): Promise<AccountModel>;
}
