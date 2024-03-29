import { ILoadSurveyResult } from '@domain/usecases';
import { SurveyModel, SurveyResultModel } from '@domain/models';
import {
  ILoadSurveyResultRepository,
  ILoadSurveyByIdRepository,
} from '@data/protocols';

export class DbLoadSurveyResult implements ILoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: ILoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository,
  ) {}

  async load(
    surveyId: string,
    accountId: string,
  ): Promise<ILoadSurveyResult.Result> {
    let surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      surveyId,
      accountId,
    );
    if (!surveyResult) {
      const survey = await this.loadSurveyByIdRepository.loadById(surveyId);
      surveyResult = this.makeEmptyResult(survey);
    }
    return surveyResult;
  }

  private makeEmptyResult(survey: SurveyModel): SurveyResultModel {
    return {
      surveyId: survey.id,
      question: survey.question,
      date: survey.date,
      answers: survey.answers.map(answer => ({
        ...answer,
        count: 0,
        percent: 0,
        isCurrentAccountAnswer: false,
      })),
    };
  }
}
