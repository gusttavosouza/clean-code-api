import { IController, HttpResponse } from '@presentation/protocols';
import { Forbidden, ServerError, Success } from '@presentation/helpers';
import { InvalidParamError } from '@presentation/errors';
import { ILoadAnswersBySurvey, ISaveSurveyResult } from '@domain/usecases';

export class SaveSurveyResultController implements IController {
  constructor(
    private readonly loadAnswersBySurvey: ILoadAnswersBySurvey,
    private readonly saveSurveyResult: ISaveSurveyResult,
  ) {}

  async handle(
    request: SaveSurveyResultController.Request,
  ): Promise<HttpResponse> {
    try {
      const { surveyId, answer } = request;
      const answers = await this.loadAnswersBySurvey.loadAnswers(surveyId);
      if (!answers.length) {
        return Forbidden(new InvalidParamError('surveyId'));
      }
      if (!answers.includes(answer)) {
        return Forbidden(new InvalidParamError('answer'));
      }
      const surveyResult = await this.saveSurveyResult.save({
        ...request,
        date: new Date(),
      });
      return Success(surveyResult);
    } catch (error) {
      return ServerError(error);
    }
  }
}

export namespace SaveSurveyResultController {
  export type Request = {
    surveyId: string;
    answer: string;
    accountId: string;
  };
}
