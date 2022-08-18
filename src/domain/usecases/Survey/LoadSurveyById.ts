import { SurveyModel } from '../models/Survey';

export interface ILoadSurveyById {
  loadById(id: string): Promise<SurveyModel>;
}
