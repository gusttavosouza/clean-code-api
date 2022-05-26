import { InvalidParamError, MissingParamError } from '../../errors';
import { BadRequest, InternalError, Success } from '../../helpers';
import {
  IController,
  IEmailValidator,
  IHttpRequest,
  IHttpResponse,
  IAddAccount,
} from './SignUpProtocols';

class SignUpController implements IController {
  private readonly emailValidator: IEmailValidator;
  private readonly addAccount: IAddAccount;

  constructor(emailValidator: IEmailValidator, addAccount: IAddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const requiredField = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];

      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return BadRequest(new MissingParamError(field));
        }
      }

      const { email, password, passwordConfirmation, name } = httpRequest.body;
      if (password !== passwordConfirmation) {
        return BadRequest(new InvalidParamError('passwordConfirmation'));
      }

      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return BadRequest(new InvalidParamError('email'));
      }

      const account = await this.addAccount.add({
        name,
        email,
        password,
      });

      return Success(account);
    } catch (error) {
      return InternalError();
    }
  }
}

export default SignUpController;