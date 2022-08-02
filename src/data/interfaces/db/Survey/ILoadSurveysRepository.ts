import { SurveyModel } from '@domain/models/Survey';

export interface ILoadSurveysRepository {
  loadAll(): Promise<SurveyModel[]>;
}
