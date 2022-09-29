import { SaveSurveyResultParams } from '@domain/usecases/SurveyResult/SaveSurveyResult';

export interface ISaveSurveyResultRepository {
  save(data: SaveSurveyResultParams): Promise<void>;
}
