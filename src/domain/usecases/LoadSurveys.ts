import { ISurveyModel } from '../models/Survey';

export interface ILoadSurveys {
  loadAll(): Promise<ISurveyModel[]>;
}
