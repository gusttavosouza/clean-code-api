export { AccountModel } from '@domain/models/Account';
export {
  IAddAccount,
  AddAccountParams,
} from '@domain/usecases/Account/AddAccount';
export { IAuthentication } from '@domain/usecases/Account/Authentication';

export {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from '@presentation/interfaces';

export { AuthenticationParams } from '@data/usecases/Account/Authentication/DBAuthenticationProtocols';
