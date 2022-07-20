import { InternalError, Success } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  ILoadSurveys,
} from './LoadSurveysControllerProtocols';

export class LoadSurveysController implements IController {
  constructor(private readonly loadSurveys: ILoadSurveys) {
    this.loadSurveys = loadSurveys;
  }

  public async handle(_: IHttpRequest): Promise<IHttpResponse> {
    try {
      const surveys = await this.loadSurveys.load();
      return Success(surveys);
    } catch (error) {
      return InternalError(error);
    }
  }
}
