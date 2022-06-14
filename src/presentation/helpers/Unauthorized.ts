import { UnauthorizedError } from '../errors';
import { IHttpResponse } from '../interfaces/IHttp';

const Unauthorized = (): IHttpResponse => {
  return {
    statusCode: 401,
    body: new UnauthorizedError(),
  };
};

export default Unauthorized;
