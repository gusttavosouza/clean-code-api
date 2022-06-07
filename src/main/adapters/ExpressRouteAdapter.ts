import { Request, Response } from 'express';
import { IHttpRequest } from '../../presentation/interfaces/IHttp';
import { IController } from '../../presentation/interfaces';

export const AdapterExpressRoute = (controller: IController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: IHttpRequest = {
      body: request.body,
    };
    const httpResponse = await controller.handle(httpRequest);
    response.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
