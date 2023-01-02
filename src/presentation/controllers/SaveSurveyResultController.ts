import { ILoadSurveyById, ISaveSurveyResult } from '@domain/usecases';
import { InvalidParamError } from '@presentation/errors';
import { Forbidden, InternalError, Success } from '@presentation/helpers/http';
import { IController, IHttpResponse } from '@presentation/interfaces';

type SaveSurveyResultParams = {
  accountId: string;
  surveyId: string;
  answer: string;
};

export class SaveSurveyResultController implements IController {
  constructor(
    private readonly loadSurveyById: ILoadSurveyById,
    private readonly saveSurveyResult: ISaveSurveyResult,
  ) {
    this.loadSurveyById = loadSurveyById;
    this.saveSurveyResult = saveSurveyResult;
  }

  public async handle(request: SaveSurveyResultParams): Promise<IHttpResponse> {
    try {
      const { surveyId, answer, accountId } = request;

      const survey = await this.loadSurveyById.loadById(surveyId);
      if (!survey) {
        return Forbidden(new InvalidParamError('Survey not found'));
      }

      const answers = survey.answers.map(item => item.answer);
      if (!answers.includes(answer)) {
        return Forbidden(new InvalidParamError('answer'));
      }

      const surveyResult = await this.saveSurveyResult.save({
        surveyId,
        accountId,
        answer,
        date: new Date(),
      });

      return Success(surveyResult);
    } catch (error) {
      return InternalError(error);
    }
  }
}
