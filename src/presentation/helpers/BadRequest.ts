import { IHttpResponse } from '../interfaces/IHttp';

const BadRequest = (error: Error): IHttpResponse => {
  return {
    statusCode: 400,
    body: error,
  };
};

export default BadRequest;
