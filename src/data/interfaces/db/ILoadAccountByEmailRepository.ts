import { IAccountModel } from '../../domain/models/Account';

export interface ILoadAccountByEmailRepository {
  load(_: string): Promise<IAccountModel>;
}
