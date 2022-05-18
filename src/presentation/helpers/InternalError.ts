import { IHttpResponse } from '../interfaces/IHttp';
import ServerError from '../errors/ServerError';

const InternalError = (): IHttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(),
  };
};

export default InternalError;
