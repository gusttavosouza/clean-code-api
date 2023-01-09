import { AccountModel } from '@domain/models/Account';
import { IAddAccount } from '@domain/usecases';
import { IAuthentication } from '@domain/usecases/Authentication';

export const mockAccountModel = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

export const mockAddAccountParams = (): IAddAccount.Params => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

export const mockAuthentication = (): IAuthentication.Params => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});
