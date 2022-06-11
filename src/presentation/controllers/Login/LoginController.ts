import { MissingParamError } from '../../errors';
import { BadRequest } from '../../helpers';
import { IController, IHttpRequest, IHttpResponse } from '../../interfaces';

export class LoginController implements IController {
  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    if (!httpRequest.body.email) {
      return new Promise(resolve =>
        resolve(BadRequest(new MissingParamError('email'))),
      );
    }

    if (!httpRequest.body.password) {
      return new Promise(resolve =>
        resolve(BadRequest(new MissingParamError('password'))),
      );
    }

    return new Promise(resolve => resolve(null));
  }
}
