import faker from 'faker';
import {
  IAddAccountRepository,
  ILoadAccountByEmailRepository,
  ILoadAccountByTokenRepository,
  IUpdateAccessTokenRepository,
  ICheckAccountByEmailRepository,
} from '@data/protocols';

export class AddAccountRepositorySpy implements IAddAccountRepository {
  params: IAddAccountRepository.Params;
  result = true;

  async add(
    params: IAddAccountRepository.Params,
  ): Promise<IAddAccountRepository.Result> {
    this.params = params;
    return this.result;
  }
}

export class LoadAccountByEmailRepositorySpy
  implements ILoadAccountByEmailRepository
{
  email: string;
  result = {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    password: faker.internet.password(),
  };

  async loadByEmail(
    email: string,
  ): Promise<ILoadAccountByEmailRepository.Result> {
    this.email = email;
    return this.result;
  }
}

export class CheckAccountByEmailRepositorySpy
  implements ICheckAccountByEmailRepository
{
  email: string;
  result = false;

  async checkByEmail(
    email: string,
  ): Promise<ICheckAccountByEmailRepository.Result> {
    this.email = email;
    return this.result;
  }
}

export class LoadAccountByTokenRepositorySpy
  implements ILoadAccountByTokenRepository
{
  token: string;
  role: string;
  result = {
    id: faker.random.uuid(),
  };

  async loadByToken(
    token: string,
    role?: string,
  ): Promise<ILoadAccountByTokenRepository.Result> {
    this.token = token;
    this.role = role;
    return this.result;
  }
}

export class UpdateAccessTokenRepositorySpy
  implements IUpdateAccessTokenRepository
{
  id: string;
  token: string;

  async updateAccessToken(id: string, token: string): Promise<void> {
    this.id = id;
    this.token = token;
  }
}
