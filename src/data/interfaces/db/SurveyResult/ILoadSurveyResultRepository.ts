import { SurveyResultModel } from '@domain/models/SurveyResult';

export interface ILoadSurveyResultRepository {
  loadBySurveyId(surveyId: string): Promise<SurveyResultModel>;
}
