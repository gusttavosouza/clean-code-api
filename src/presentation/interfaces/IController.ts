import { IHttpRequest, IHttpResponse } from './IHttp';

interface IController {
  handle(httpRequest: IHttpRequest): IHttpResponse;
}

export default IController;
