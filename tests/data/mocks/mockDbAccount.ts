import {
  IAddAccountRepository,
  ILoadAccountByEmailRepository,
  IUpdateAccessTokenRepository,
  ILoadAccountByTokenRepository,
} from '@data/interfaces/db';

import { AccountModel } from '@domain/models/Account';
import { mockAccountModel } from '@tests/domain/mocks';

export const mockAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    add(
      _: IAddAccountRepository.Params,
    ): Promise<IAddAccountRepository.Result> {
      return Promise.resolve(mockAccountModel());
    }
  }
  return new AddAccountRepositoryStub();
};

export const mockLoadAccountByEmailRepository =
  (): ILoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub
      implements ILoadAccountByEmailRepository
    {
      async loadByEmail(_: string): Promise<AccountModel> {
        return Promise.resolve(mockAccountModel());
      }
    }
    return new LoadAccountByEmailRepositoryStub();
  };

export const mockLoadAccountByToken = (): ILoadAccountByTokenRepository => {
  class LoadAccountTokenRepositoryStub
    implements ILoadAccountByTokenRepository
  {
    async loadByToken(
      _: string,
      __?: string,
    ): Promise<ILoadAccountByTokenRepository.Result> {
      return Promise.resolve(mockAccountModel());
    }
  }
  return new LoadAccountTokenRepositoryStub();
};

export const mockUpdateAccessTokenRepositoryStub =
  (): IUpdateAccessTokenRepository => {
    class UpdateAccessTokenRepositoryStub
      implements IUpdateAccessTokenRepository
    {
      async updateAccessToken(_: string, __: string): Promise<void> {
        return Promise.resolve();
      }
    }
    return new UpdateAccessTokenRepositoryStub();
  };
