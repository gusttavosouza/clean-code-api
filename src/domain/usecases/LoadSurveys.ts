import { ISurveyModel } from '../models/Survey';

export interface ILoadSurveys {
  load(): Promise<ISurveyModel[]>;
}
