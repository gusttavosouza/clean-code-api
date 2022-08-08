import { SurveyResultModel } from '@domain/models/SurveyResult';
import { SaveSurveyResultModel } from '@domain/usecases/SaveSurveyResult';

export interface ISaveSurveyResultRepository {
  save(data: SaveSurveyResultModel): Promise<SurveyResultModel>;
}
