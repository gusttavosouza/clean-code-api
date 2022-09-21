import { SurveyResultModel } from '@domain/models/SurveyResult';

export interface ILoadSurveyResult {
  load(surveyId: string): Promise<SurveyResultModel>;
}
