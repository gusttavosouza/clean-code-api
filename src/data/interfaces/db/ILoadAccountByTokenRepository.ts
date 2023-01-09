import { AccountModel } from '@domain/models/Account';

export interface ILoadAccountByTokenRepository {
  loadByToken(
    token: string,
    role?: string,
  ): Promise<ILoadAccountByTokenRepository.Result>;
}

export namespace ILoadAccountByTokenRepository {
  export type Result = AccountModel;
}
