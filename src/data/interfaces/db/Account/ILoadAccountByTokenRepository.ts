import { AccountModel } from '@domain/models/Account';

export interface ILoadAccountByTokenRepository {
  loadByToken(token: string, role?: string): Promise<AccountModel>;
}
