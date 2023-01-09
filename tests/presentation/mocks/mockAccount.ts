import { AccountModel } from '@domain/models';
import { IAddAccount, ILoadAccountByToken } from '@domain/usecases';
import { IAuthentication } from '@domain/usecases/Authentication';

import { IValidation } from '@presentation/interfaces';
import { mockAccountModel } from '@tests/domain/mocks';

export const mockAddAccount = (): IAddAccount => {
  class AddAccountStub implements IAddAccount {
    async add(_: IAddAccount.Params): Promise<IAddAccount.Result> {
      const fakeAccount = mockAccountModel();

      return Promise.resolve(fakeAccount);
    }
  }
  return new AddAccountStub();
};

export const mockAuthentication = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    async auth(_: IAuthentication.Params): Promise<IAuthentication.Result> {
      return Promise.resolve({ accessToken: 'any_token', name: 'any_name' });
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
      return Promise.resolve(account);
    }
  }
  return new LoadAccountByTokenStub();
};
