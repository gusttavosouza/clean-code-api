import MissingParamError from '../errors/MissingParamError';
import { IHttpRequest, IHttpResponse } from '../interfaces/IHttp';

class SignUpController {
  handle(httpRequest: IHttpRequest): IHttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name'),
      };
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email'),
      };
    }

    return {} as IHttpResponse;
  }
}

export default SignUpController;
