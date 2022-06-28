import { BadRequest, InternalError, Success } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IAddAccount,
  IValidation,
} from './SignUpProtocols';

class SignUpController implements IController {
  constructor(
    private readonly addAccount: IAddAccount,
    private readonly validation: IValidation,
  ) {
    this.addAccount = addAccount;
    this.validation = validation;
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

      return Success(account);
    } catch (error) {
      return InternalError(error);
    }
  }
}

export default SignUpController;
