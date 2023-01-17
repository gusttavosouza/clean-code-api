import { IController, HttpResponse } from '@presentation/protocols';
import { NoContent, ServerError, Success } from '@presentation/helpers';
import { ILoadSurveys } from '@domain/usecases';

export class LoadSurveysController implements IController {
  constructor(private readonly loadSurveys: ILoadSurveys) {}

  async handle(request: LoadSurveysController.Request): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load(request.accountId);
      return surveys.length ? Success(surveys) : NoContent();
    } catch (error) {
      return ServerError(error);
    }
  }
}

export namespace LoadSurveysController {
  export type Request = {
    accountId: string;
  };
}
