import { SurveyModel } from '@domain/models/Survey';

export interface ILoadSurveyByIdRepository {
  loadById(id: string): Promise<SurveyModel>;
}
