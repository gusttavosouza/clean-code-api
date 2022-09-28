import { SurveyModel } from '@domain/models/Survey';

export interface ILoadSurveysRepository {
  loadAll(accountId: string): Promise<SurveyModel[]>;
}
