import { ILoadSurveys } from '@domain/usecases';
import { InternalError, NoContent, Success } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/interfaces';

export class LoadSurveysController implements IController {
  constructor(private readonly loadSurveys: ILoadSurveys) {
    this.loadSurveys = loadSurveys;
  }

  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const surveys = await this.loadSurveys.load(httpRequest.accountId);
      if (!surveys.length) {
        return NoContent();
      }

      return Success(surveys);
    } catch (error) {
      return InternalError(error);
    }
  }
}
