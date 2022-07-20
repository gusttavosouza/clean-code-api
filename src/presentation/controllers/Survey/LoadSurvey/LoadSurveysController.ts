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
    await this.loadSurveys.load();
    return null;
  }
}
