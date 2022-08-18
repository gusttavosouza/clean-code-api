import { SurveyResultModel } from '@domain/models/SurveyResult';
import { SaveSurveyResultModel } from '@domain/usecases/SurveyResult/SaveSurveyResult';

export interface ISaveSurveyResultRepository {
  save(data: SaveSurveyResultModel): Promise<SurveyResultModel>;
}
