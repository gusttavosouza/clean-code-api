import { AccountModel } from '@domain/models/Account';

export type AddAccountParams = Omit<AccountModel, 'id'>;

export interface IAddAccount {
  add(account: AddAccountParams): Promise<AccountModel>;
}

export namespace IAddAccount {
  export type Params = {
    name: string;
    email: string;
    password: string;
  };
  export type Result = AccountModel;
}
