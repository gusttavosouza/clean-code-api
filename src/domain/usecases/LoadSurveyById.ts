import { SurveyModel } from '@domain/models/Survey';

export interface ILoadSurveyById {
  loadById(id: string): Promise<SurveyModel>;
}
