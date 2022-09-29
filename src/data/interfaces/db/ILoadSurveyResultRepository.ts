import { SurveyResultModel } from '@domain/models/SurveyResult';

export interface ILoadSurveyResultRepository {
  loadBySurveyId(
    surveyId: string,
    accountId: string,
  ): Promise<SurveyResultModel>;
}
