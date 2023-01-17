import { IController, HttpResponse } from '@presentation/protocols';
import { Forbidden, ServerError, Success } from '@presentation/helpers';
import { InvalidParamError } from '@presentation/errors';
import { ICheckSurveyById, ILoadSurveyResult } from '@domain/usecases';

export class LoadSurveyResultController implements IController {
  constructor(
    private readonly checkSurveyById: ICheckSurveyById,
    private readonly loadSurveyResult: ILoadSurveyResult,
  ) {}

  async handle(
    request: LoadSurveyResultController.Request,
  ): Promise<HttpResponse> {
    try {
      const { surveyId, accountId } = request;
      const exists = await this.checkSurveyById.checkById(surveyId);
      if (!exists) {
        return Forbidden(new InvalidParamError('surveyId'));
      }
      const surveyResult = await this.loadSurveyResult.load(
        surveyId,
        accountId,
      );
      return Success(surveyResult);
    } catch (error) {
      return ServerError(error);
    }
  }
}

export namespace LoadSurveyResultController {
  export type Request = {
    surveyId: string;
    accountId: string;
  };
}
