import { SaveSurveyResultParams } from '@domain/usecases/SaveSurveyResult';

export interface ISaveSurveyResultRepository {
  save(data: SaveSurveyResultParams): Promise<void>;
}
