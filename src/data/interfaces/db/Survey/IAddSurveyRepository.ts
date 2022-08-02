import { AddSurveyModel } from '@domain/usecases/AddSurvey';

export interface IAddSurveyRepository {
  add(data: AddSurveyModel): Promise<void>;
}
