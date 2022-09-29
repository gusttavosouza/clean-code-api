import { AddSurveyParams } from '@domain/usecases/AddSurvey';

export interface IAddSurveyRepository {
  add(data: AddSurveyParams): Promise<void>;
}
