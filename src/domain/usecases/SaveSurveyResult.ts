import { SurveyResultModel } from '@domain/models/SurveyResult';

export type SaveSurveyResultModel = Omit<SurveyResultModel, 'id'>;

export interface ISaveSurveyResult {
  save(data: SaveSurveyResultModel): Promise<SurveyResultModel>;
}
