import { IAddSurvey } from '@domain/usecases/AddSurvey';

export interface IAddSurveyRepository {
  add(data: IAddSurvey.Params): Promise<void>;
}
