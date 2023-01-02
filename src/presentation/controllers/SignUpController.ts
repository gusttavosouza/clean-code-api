import { IAddAccount, IAuthentication } from '@domain/usecases';
import { EmailInUseError } from '@presentation/errors';

import {
  BadRequest,
  Forbidden,
  InternalError,
  Success,
} from '@presentation/helpers/http';
import {
  IController,
  IHttpResponse,
  IValidation,
} from '@presentation/interfaces';

type SignUpParams = {
  email: string;
  password: string;
  name: string;
};

export class SignUpController implements IController {
  constructor(
    private readonly addAccount: IAddAccount,
    private readonly validation: IValidation,
    private readonly authentication: IAuthentication,
  ) {
    this.addAccount = addAccount;
    this.validation = validation;
    this.authentication = authentication;
  }

  async handle(request: SignUpParams): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return BadRequest(error);
      }

      const { email, password, name } = request;
      const account = await this.addAccount.add({
        name,
        email,
        password,
      });

      if (!account) {
        return Forbidden(new EmailInUseError());
      }

      const authenticationModel = await this.authentication.auth({
        email,
        password,
      });
      return Success(authenticationModel);
    } catch (error) {
      return InternalError(error);
    }
  }
}
