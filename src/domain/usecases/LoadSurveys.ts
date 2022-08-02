import { SurveyModel } from '../models/Survey';

export interface ILoadSurveys {
  loadAll(): Promise<SurveyModel[]>;
}
