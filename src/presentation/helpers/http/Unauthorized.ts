import { UnauthorizedError } from '@presentation/errors';
import { IHttpResponse } from '@presentation/interfaces/IHttp';

const Unauthorized = (): IHttpResponse => {
  return {
    statusCode: 401,
    body: new UnauthorizedError(),
  };
};

export default Unauthorized;
