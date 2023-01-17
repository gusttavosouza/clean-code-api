import { IMiddleware, HttpResponse } from '@presentation/protocols';
import { Forbidden, Success, ServerError } from '@presentation/helpers';
import { AccessDeniedError } from '@presentation/errors';
import { ILoadAccountByToken } from '@domain/usecases';

export class AuthMiddleware implements IMiddleware {
  constructor(
    private readonly loadAccountByToken: ILoadAccountByToken,
    private readonly role?: string,
  ) {}

  async handle(request: AuthMiddleware.Request): Promise<HttpResponse> {
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
      return ServerError(error);
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string;
  };
}
