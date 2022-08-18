import {
  IController,
  IHttpRequest,
  IHttpResponse,
  ILoadSurveyById,
} from './SaveSurveyResultControllerProtocols';

export class SaveSurveyResultController implements IController {
  constructor(private readonly loadSurveyById: ILoadSurveyById) {
    this.loadSurveyById = loadSurveyById;
  }

  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { surveyId } = httpRequest.params;
    await this.loadSurveyById.loadById(surveyId);
    return null;
  }
}
