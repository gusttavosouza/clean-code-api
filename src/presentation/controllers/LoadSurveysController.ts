import { ILoadSurveys } from '@domain/usecases';
import { InternalError, NoContent, Success } from '@presentation/helpers/http';
import { IController, IHttpResponse } from '@presentation/interfaces';

type LoadSurveysProps = {
  accountId: string;
};

export class LoadSurveysController implements IController {
  constructor(private readonly loadSurveys: ILoadSurveys) {
    this.loadSurveys = loadSurveys;
  }

  public async handle(request: LoadSurveysProps): Promise<IHttpResponse> {
    try {
      const surveys = await this.loadSurveys.load(request.accountId);
      if (!surveys.length) {
        return NoContent();
      }

      return Success(surveys);
    } catch (error) {
      return InternalError(error);
    }
  }
}
