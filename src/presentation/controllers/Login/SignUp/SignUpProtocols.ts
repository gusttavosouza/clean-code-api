export { AccountModel as IAccountModel } from '@domain/models/Account';
export {
  IAddAccount,
  AddAccountModel as IAddAccountModel,
} from '@domain/usecases/AddAccount';
export { IAuthentication } from '@domain/usecases/Authentication';

export {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/interfaces';
