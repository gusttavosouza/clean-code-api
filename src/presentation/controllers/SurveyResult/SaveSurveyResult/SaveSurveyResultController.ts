import { InvalidParamError } from '@presentation/errors';
import { Forbidden } from '@presentation/helpers/http';
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
    const survey = await this.loadSurveyById.loadById(surveyId);
    console.log(survey);
    if (!survey) {
      return Forbidden(new InvalidParamError('Survey not found'));
    }
    return null;
  }
}
