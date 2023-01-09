import { ISaveSurveyResult } from '@domain/usecases';

export interface ISaveSurveyResultRepository {
  save(data: ISaveSurveyResult.Params): Promise<void>;
}
