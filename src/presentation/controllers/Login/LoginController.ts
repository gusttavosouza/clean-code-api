import { IAuthentication } from '../../../domain/usecases/IAuthentication';
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
  private readonly authentication: IAuthentication;

  constructor(
    emailValidator: IEmailValidator,
    authentication: IAuthentication,
  ) {
    this.emailValidator = emailValidator;
    this.authentication = authentication;
  }

  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const requiredField = ['email', 'password'];

      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return BadRequest(new MissingParamError(field));
        }
      }

      const { email, password } = httpRequest.body;

      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return BadRequest(new InvalidParamError('email'));
      }

      await this.authentication.auth(email, password);
    } catch (error) {
      return InternalError(error);
    }

    return new Promise(resolve => resolve(null));
  }
}
