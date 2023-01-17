import faker from 'faker';

import {
  IAddAccount,
  IAuthentication,
  ILoadAccountByToken,
} from '@domain/usecases';

export class AddAccountSpy implements IAddAccount {
  params: IAddAccount.Params;
  result = true;

  async add(params: IAddAccount.Params): Promise<IAddAccount.Result> {
    this.params = params;
    return this.result;
  }
}

export class AuthenticationSpy implements IAuthentication {
  params: IAuthentication.Params;
  result = {
    accessToken: faker.random.uuid(),
    name: faker.name.findName(),
  };

  async auth(params: IAuthentication.Params): Promise<IAuthentication.Result> {
    this.params = params;
    return this.result;
  }
}

export class LoadAccountByTokenSpy implements ILoadAccountByToken {
  accessToken: string;
  role: string;
  result = {
    id: faker.random.uuid(),
  };

  async load(
    accessToken: string,
    role?: string,
  ): Promise<ILoadAccountByToken.Result> {
    this.accessToken = accessToken;
    this.role = role;
    return this.result;
  }
}
