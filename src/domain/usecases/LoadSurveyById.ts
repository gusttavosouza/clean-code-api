import { SurveyModel } from '../models/Survey';

export interface ILoadSurveys {
  loadById(): Promise<SurveyModel>;
}
