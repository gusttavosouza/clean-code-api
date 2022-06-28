import { IHttpResponse } from '@presentation/interfaces/IHttp';
import ServerError from '@presentation/errors/ServerError';

const InternalError = (error: Error): IHttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(error.stack),
  };
};

export default InternalError;
