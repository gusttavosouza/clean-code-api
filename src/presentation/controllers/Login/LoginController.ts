import { MissingParamError } from '../../errors';
import { BadRequest } from '../../helpers';
import { IController, IHttpRequest, IHttpResponse } from '../../interfaces';

export class LoginController implements IController {
  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return new Promise(resolve =>
      resolve(BadRequest(new MissingParamError('email'))),
    );
  }
}
