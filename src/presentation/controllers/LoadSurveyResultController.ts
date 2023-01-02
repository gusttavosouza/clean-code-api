import { ILoadSurveyById, ILoadSurveyResult } from '@domain/usecases';
import { InvalidParamError } from '@presentation/errors';
import { Forbidden, InternalError, Success } from '@presentation/helpers/http';
import { IController, IHttpResponse } from '@presentation/interfaces';

type LoadSurveyResultParams = {
  surveyId: string;
  accountId: string;
};

export class LoadSurveyResultController implements IController {
  constructor(
    private readonly loadSurveyById: ILoadSurveyById,
    private readonly loadSurveyResult: ILoadSurveyResult,
  ) {}

  public async handle(request: LoadSurveyResultParams): Promise<IHttpResponse> {
    try {
      const { surveyId, accountId } = request;
      const survey = await this.loadSurveyById.loadById(surveyId);
      if (!survey) {
        return Forbidden(new InvalidParamError('surveyId'));
      }

      const surveyResult = await this.loadSurveyResult.load(
        surveyId,
        accountId,
      );
      return Success(surveyResult);
    } catch (error) {
      return InternalError(new Error());
    }
  }
}
