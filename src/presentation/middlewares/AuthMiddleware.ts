import { ILoadAccountByToken } from '@domain/usecases/ILoadAccountByToken';
import { AccessDeniedError } from '@presentation/errors';
import { Forbidden } from '@presentation/helpers/http';
import {
  IHttpRequest,
  IHttpResponse,
  IMiddleware,
} from '@presentation/interfaces';

export class AuthMiddleware implements IMiddleware {
  constructor(private readonly loadAccountByToken: ILoadAccountByToken) {
    this.loadAccountByToken = loadAccountByToken;
  }

  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token'];
    if (accessToken) {
      this.loadAccountByToken.load(accessToken);
    }
    return Forbidden(new AccessDeniedError());
  }
}
