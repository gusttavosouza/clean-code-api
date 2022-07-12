import { IHttpResponse } from '@presentation/interfaces/IHttp';

export const Forbidden = (error: Error): IHttpResponse => {
  return {
    statusCode: 403,
    body: error,
  };
};
