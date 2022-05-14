import MissingParamError from '../errors/MissingParamError';
import { IHttpRequest, IHttpResponse } from '../interfaces/IHttp';
import BadRequest from '../helpers/BadRequest';
import IController from '../interfaces/IController';

class SignUpController implements IController {
  handle(httpRequest: IHttpRequest): IHttpResponse {
    const requiredField = ['name', 'email', 'password', 'passwordConfirmation'];

    for (const field of requiredField) {
      if (!httpRequest.body[field]) {
        return BadRequest(new MissingParamError(field));
      }
    }

    return {} as IHttpResponse;
  }
}

export default SignUpController;
