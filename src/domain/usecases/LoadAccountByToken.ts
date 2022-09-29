import { AccountModel } from '@domain/models/Account';

export interface ILoadAccountByToken {
  load(accessToken: string, role?: string): Promise<AccountModel>;
}
