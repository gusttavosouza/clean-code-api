import { AccountModel } from '@domain/models/Account';

export type AddAccountParams = Omit<AccountModel, 'id'>;

export interface IAddAccount {
  add(account: AddAccountParams): Promise<AccountModel>;
}
