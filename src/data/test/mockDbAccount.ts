import {
  IAddAccountRepository,
  ILoadAccountByEmailRepository,
  IUpdateAccessTokenRepository,
} from '@data/interfaces/db/Account';
import { ILoadAccountByTokenRepository } from '@data/interfaces/db/Account/ILoadAccountByTokenRepository';
import { AccountModel } from '@domain/models/Account';
import { mockAccountModel } from '@domain/test';
import { AddAccountParams } from '@domain/usecases/Account/AddAccount';

export const mockAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    add(_: AddAccountParams): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockAccountModel()));
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
        return new Promise(resolve => resolve(mockAccountModel()));
      }
    }
    return new LoadAccountByEmailRepositoryStub();
  };

export const mockLoadAccountByToken = (): ILoadAccountByTokenRepository => {
  class LoadAccountTokenRepositoryStub
    implements ILoadAccountByTokenRepository
  {
    async loadByToken(_: string, __?: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockAccountModel()));
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
        return new Promise(resolve => resolve());
      }
    }
    return new UpdateAccessTokenRepositoryStub();
  };
