import { ILogErrorRepository } from '@data/interfaces/db';
import { IController, IHttpResponse } from '@presentation/interfaces';

export class LogControllerDecorator implements IController {
  constructor(
    private readonly controller: IController,
    private readonly logErrorRepository: ILogErrorRepository,
  ) {
    this.controller = controller;
    this.logErrorRepository = logErrorRepository;
  }

  async handle(request: any): Promise<IHttpResponse> {
    const httpResponse = await this.controller.handle(request);
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack);
    }
    return httpResponse;
  }
}
