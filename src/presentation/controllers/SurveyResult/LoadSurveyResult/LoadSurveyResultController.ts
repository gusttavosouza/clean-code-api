import { InvalidParamError } from '@presentation/errors';
import { Forbidden, InternalError, Success } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  ILoadSurveyById,
  ILoadSurveyResult,
} from './LoadSurveyResultControllerProtocols';

export class LoadSurveyResultController implements IController {
  constructor(
    private readonly loadSurveyById: ILoadSurveyById,
    private readonly loadSurveyResult: ILoadSurveyResult,
  ) {}

  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { surveyId } = httpRequest.params;
      const survey = await this.loadSurveyById.loadById(surveyId);
      if (!survey) {
        return Forbidden(new InvalidParamError('surveyId'));
      }

      const surveyResult = await this.loadSurveyResult.load(
        surveyId,
        httpRequest.accountId,
      );
      return Success(surveyResult);
    } catch (error) {
      return InternalError(new Error());
    }
  }
}
