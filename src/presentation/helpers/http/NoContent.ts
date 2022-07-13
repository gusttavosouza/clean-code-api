import { IHttpResponse } from '@presentation/interfaces/IHttp';

export const NoContent = (): IHttpResponse => {
  return {
    statusCode: 204,
    body: null,
  };
};
