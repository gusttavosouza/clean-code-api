import { IAddSurveyModel } from '@domain/usecases/AddSurvey';

export interface IAddSurveyRepository {
  add(data: IAddSurveyModel): Promise<void>;
}
