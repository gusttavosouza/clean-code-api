import { IAddAccount } from '../../domain/usecases/AddAccount';
import { InvalidParamError, MissingParamError } from '../errors';
import { BadRequest, InternalError } from '../helpers';
import {
  IController,
  IEmailValidator,
  IHttpRequest,
  IHttpResponse,
} from '../interfaces';

class SignUpController implements IController {
  private readonly emailValidator: IEmailValidator;
  private readonly addAccount: IAddAccount;

  constructor(emailValidator: IEmailValidator, addAccount: IAddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  handle(httpRequest: IHttpRequest): IHttpResponse {
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

      this.addAccount.add({
        name,
        email,
        password,
      });
    } catch (error) {
      return InternalError();
    }

    return {} as IHttpResponse;
  }
}

export default SignUpController;
