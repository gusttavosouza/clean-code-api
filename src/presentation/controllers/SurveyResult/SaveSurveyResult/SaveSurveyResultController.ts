import { InvalidParamError } from '@presentation/errors';
import { Forbidden, InternalError } from '@presentation/helpers/http';
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
    try {
      const { surveyId } = httpRequest.params;
      const { answer } = httpRequest.body;
      const survey = await this.loadSurveyById.loadById(surveyId);
      if (!survey) {
        return Forbidden(new InvalidParamError('Survey not found'));
      }

      const answers = survey.answers.map(item => item.answer);
      if (!answers.includes(answer)) {
        return Forbidden(new InvalidParamError('answer'));
      }

      return null;
    } catch (error) {
      return InternalError(error);
    }
  }
}
