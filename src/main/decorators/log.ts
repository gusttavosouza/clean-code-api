import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '../../presentation/interfaces';

export class LogControllerDecorator implements IController {
  private readonly controller: IController;
  constructor(controller: IController) {
    this.controller = controller;
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest);
    if (httpResponse.statusCode === 500) {
      console.log('ERRO DE SERVIDOR');
    }
    return httpResponse;
  }
}
