import MissingParamError from '../errors/MissingParamError';
import { IHttpRequest, IHttpResponse } from '../interfaces/IHttp';
import BadRequest from '../helpers/BadRequest';

class SignUpController {
  handle(httpRequest: IHttpRequest): IHttpResponse {
    if (!httpRequest.body.name) {
      return BadRequest(new MissingParamError('name'));
    }

    if (!httpRequest.body.email) {
      return BadRequest(new MissingParamError('email'));
    }

    if (!httpRequest.body.password) {
      return BadRequest(new MissingParamError('password'));
    }

    if (!httpRequest.body.passwordConfirmation) {
      return BadRequest(new MissingParamError('passwordConfirmation'));
    }

    return {} as IHttpResponse;
  }
}

export default SignUpController;
