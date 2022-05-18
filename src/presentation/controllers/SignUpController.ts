import InvalidParamError from '../errors/InvalidParamError';
import MissingParamError from '../errors/MissingParamError';
import { IHttpRequest, IHttpResponse } from '../interfaces/IHttp';
import BadRequest from '../helpers/BadRequest';
import IController from '../interfaces/IController';
import IEmailValidator from '../interfaces/IEmailValidator';
import ServerError from '../errors/ServerError';

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
      return {
        statusCode: 500,
        body: new ServerError(),
      };
    }

    return {} as IHttpResponse;
  }
}

export default SignUpController;
