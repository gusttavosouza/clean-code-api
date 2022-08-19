import { InvalidParamError } from '@presentation/errors';
import { Forbidden, InternalError } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  ILoadSurveyById,
  ISaveSurveyResult,
} from './SaveSurveyResultControllerProtocols';

export class SaveSurveyResultController implements IController {
  constructor(
    private readonly loadSurveyById: ILoadSurveyById,
    private readonly saveSurveyResult: ISaveSurveyResult,
  ) {
    this.loadSurveyById = loadSurveyById;
    this.saveSurveyResult = saveSurveyResult;
  }

  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { surveyId } = httpRequest.params;
      const { answer } = httpRequest.body;
      const { accountId } = httpRequest;

      const survey = await this.loadSurveyById.loadById(surveyId);
      if (!survey) {
        return Forbidden(new InvalidParamError('Survey not found'));
      }

      const answers = survey.answers.map(item => item.answer);
      if (!answers.includes(answer)) {
        return Forbidden(new InvalidParamError('answer'));
      }

      await this.saveSurveyResult.save({
        surveyId,
        accountId,
        answer,
        date: new Date(),
      });

      return null;
    } catch (error) {
      return InternalError(error);
    }
  }
}
