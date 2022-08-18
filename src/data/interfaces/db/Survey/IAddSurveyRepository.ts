import { AddSurveyModel } from '@domain/usecases/Survey/AddSurvey';

export interface IAddSurveyRepository {
  add(data: AddSurveyModel): Promise<void>;
}
