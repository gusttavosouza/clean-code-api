import {
  IController,
  IHttpRequest,
  IHttpResponse,
  ILoadSurveyById,
} from './LoadSurveyResultControllerProtocols';

export class LoadSurveyResultController implements IController {
  constructor(private readonly loadSurveyByIdStub: ILoadSurveyById) {}

  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { surveyId } = httpRequest.params;
    this.loadSurveyByIdStub.loadById(surveyId);
    return Promise.resolve(null);
  }
}
