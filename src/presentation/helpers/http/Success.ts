import { IHttpResponse } from '@presentation/interfaces/IHttp';

export const Success = (data: any): IHttpResponse => {
  return {
    statusCode: 200,
    body: data,
  };
};
