import { AccountModel } from '@domain/models/Account';

export interface ILoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<AccountModel>;
}
