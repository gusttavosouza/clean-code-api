import { InvalidParamError, MissingParamError } from '../../errors';
import { BadRequest, InternalError } from '../../helpers';
import {
  IController,
  IEmailValidator,
  IHttpRequest,
  IHttpResponse,
} from '../../interfaces';

export class LoginController implements IController {
  private readonly emailValidator: IEmailValidator;

  constructor(emailValidator: IEmailValidator) {
    this.emailValidator = emailValidator;
  }

  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { email, password } = httpRequest.body;
      if (!email) {
        return new Promise(resolve =>
          resolve(BadRequest(new MissingParamError('email'))),
        );
      }

      if (!password) {
        return new Promise(resolve =>
          resolve(BadRequest(new MissingParamError('password'))),
        );
      }

      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return new Promise(resolve =>
          resolve(BadRequest(new InvalidParamError('email'))),
        );
      }
    } catch (error) {
      return InternalError(error);
    }

    return new Promise(resolve => resolve(null));
  }
}
