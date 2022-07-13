import { EmailInUseError } from '@presentation/errors';

import {
  BadRequest,
  Forbidden,
  InternalError,
  Success,
} from '@presentation/helpers/http';

import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IAddAccount,
  IValidation,
  IAuthentication,
} from './SignUpProtocols';

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

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return BadRequest(error);
      }

      const { email, password, name } = httpRequest.body;
      const account = await this.addAccount.add({
        name,
        email,
        password,
      });

      if (!account) {
        return Forbidden(new EmailInUseError());
      }

      const accessToken = await this.authentication.auth({ email, password });
      return Success({ accessToken });
    } catch (error) {
      return InternalError(error);
    }
  }
}
