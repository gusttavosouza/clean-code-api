import { AccountModel } from '@domain/models/Account';
import { mockAccountModel } from '@domain/test';
import {
  AddAccountParams,
  IAddAccount,
} from '@domain/usecases/Account/AddAccount';
import {
  AuthenticationParams,
  IAuthentication,
} from '@domain/usecases/Account/Authentication';

import { IValidation } from '@presentation/interfaces';
import { ILoadAccountByToken } from '@domain/usecases/Account/LoadAccountByToken';

export const mockAddAccount = (): IAddAccount => {
  class AddAccountStub implements IAddAccount {
    async add(_: AddAccountParams): Promise<AccountModel> {
      const fakeAccount = mockAccountModel();

      return new Promise(resolve => resolve(fakeAccount));
    }
  }
  return new AddAccountStub();
};

export const mockAuthentication = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    async auth(_: AuthenticationParams): Promise<string> {
      return new Promise(resolve => resolve('any_token'));
    }
  }

  return new AuthenticationStub();
};

export const mockValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate(_: any): Error {
      return null;
    }
  }
  return new ValidationStub();
};

export const mockLoadAccountByToken = (): ILoadAccountByToken => {
  class LoadAccountByTokenStub implements ILoadAccountByToken {
    async load(_: string, __?: string): Promise<AccountModel> {
      const account = mockAccountModel();
      return new Promise(resolve => resolve(account));
    }
  }
  return new LoadAccountByTokenStub();
};
