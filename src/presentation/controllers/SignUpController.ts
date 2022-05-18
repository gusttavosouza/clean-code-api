import { InvalidParamError, MissingParamError } from '../errors';
import { IHttpRequest, IHttpResponse } from '../interfaces/IHttp';
import { BadRequest, InternalError } from '../helpers';
import IController from '../interfaces/IController';
import IEmailValidator from '../interfaces/IEmailValidator';

class SignUpController implements IController {
  private readonly emailValidator: IEmailValidator;

  constructor(emailValidator: IEmailValidator) {
    this.emailValidator = emailValidator;
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

      const isValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValid) {
        return BadRequest(new InvalidParamError('email'));
      }
    } catch (error) {
      return InternalError();
    }

    return {} as IHttpResponse;
  }
}

export default SignUpController;
