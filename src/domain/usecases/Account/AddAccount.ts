import { AccountModel } from '@domain/models/Account';
import { IAccountModel } from '@presentation/middlewares/AuthMiddlewareProtocols';

export type AddAccountModel = Omit<IAccountModel, 'id'>;

export interface IAddAccount {
  add(account: AddAccountModel): Promise<AccountModel>;
}
