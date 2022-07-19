import { AccessDeniedError } from '@presentation/errors';
import { Forbidden } from '@presentation/helpers/http';
import {
  IHttpRequest,
  IHttpResponse,
  IMiddleware,
} from '@presentation/interfaces';

export class AuthMiddleware implements IMiddleware {
  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return new Promise(resolve => resolve(Forbidden(new AccessDeniedError())));
  }
}
