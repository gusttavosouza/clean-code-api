import { SurveyModel } from '@domain/models/Survey';

export interface ILoadSurveys {
  load(accountId: string): Promise<SurveyModel[]>;
}
