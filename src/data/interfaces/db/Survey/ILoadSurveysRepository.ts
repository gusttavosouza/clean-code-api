import { ISurveyModel } from '@domain/models/Survey';

export interface ILoadSurveysRepository {
  loadAll(): Promise<ISurveyModel[]>;
}
