import { ILoadAccountByToken } from '@domain/usecases';
import { AccessDeniedError } from '@presentation/errors';
import { Forbidden, Success, InternalError } from '@presentation/helpers/http';
import { IHttpResponse, IMiddleware } from '@presentation/interfaces';

type AuthMiddlewareParams = {
  accessToken: string;
};

export class AuthMiddleware implements IMiddleware {
  constructor(
    private readonly loadAccountByToken: ILoadAccountByToken,
    private readonly role?: string,
  ) {
    this.loadAccountByToken = loadAccountByToken;
    this.role = role;
  }

  public async handle(request: AuthMiddlewareParams): Promise<IHttpResponse> {
    try {
      const { accessToken } = request;
      if (accessToken) {
        const account = await this.loadAccountByToken.load(
          accessToken,
          this.role,
        );
        if (account) {
          return Success({ accountId: account.id });
        }
      }
      return Forbidden(new AccessDeniedError());
    } catch (error) {
      return InternalError(error);
    }
  }
}
