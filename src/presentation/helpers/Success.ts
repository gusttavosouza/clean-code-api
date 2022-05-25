import { IHttpResponse } from '../interfaces/IHttp';

const Success = (data: any): IHttpResponse => {
  return {
    statusCode: 200,
    body: data,
  };
};

export default Success;
