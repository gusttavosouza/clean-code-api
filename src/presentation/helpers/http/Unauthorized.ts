import { UnauthorizedError } from '@presentation/errors';
import { IHttpResponse } from '@presentation/interfaces/IHttp';

export const Unauthorized = (): IHttpResponse => {
  return {
    statusCode: 401,
    body: new UnauthorizedError(),
  };
};
