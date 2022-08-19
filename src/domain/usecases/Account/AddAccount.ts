import { AccountModel } from '@domain/models/Account';

export type AddAccountModel = Omit<AccountModel, 'id'>;

export interface IAddAccount {
  add(account: AddAccountModel): Promise<AccountModel>;
}
