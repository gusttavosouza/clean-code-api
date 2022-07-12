import { BadRequest, InternalError, Success } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IAddAccount,
  IValidation,
  IAuthentication,
} from './SignUpProtocols';

class SignUpController implements IController {
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
      await this.addAccount.add({
        name,
        email,
        password,
      });

      const accessToken = await this.authentication.auth({ email, password });
      return Success({ accessToken });
    } catch (error) {
      return InternalError(error);
    }
  }
}

export default SignUpController;
