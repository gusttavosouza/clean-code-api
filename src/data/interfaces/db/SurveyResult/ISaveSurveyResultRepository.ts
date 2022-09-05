import { SurveyResultModel } from '@domain/models/SurveyResult';
import { SaveSurveyResultParams } from '@domain/usecases/SurveyResult/SaveSurveyResult';

export interface ISaveSurveyResultRepository {
  save(data: SaveSurveyResultParams): Promise<SurveyResultModel>;
}
