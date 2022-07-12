import { IHttpResponse } from '@presentation/interfaces/IHttp';

export const BadRequest = (error: Error): IHttpResponse => {
  return {
    statusCode: 400,
    body: error,
  };
};
