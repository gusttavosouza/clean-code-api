import { SurveyModel } from '@domain/models/Survey';

export interface ILoadSurveys {
  loadAll(): Promise<SurveyModel[]>;
}
