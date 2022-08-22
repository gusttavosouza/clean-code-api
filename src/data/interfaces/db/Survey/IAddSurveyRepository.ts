import { AddSurveyParams } from '@domain/usecases/Survey/AddSurvey';

export interface IAddSurveyRepository {
  add(data: AddSurveyParams): Promise<void>;
}
