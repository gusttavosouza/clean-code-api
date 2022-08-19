import { SurveyModel } from '@domain/models/Survey';

export type AddSurveyModel = Omit<SurveyModel, 'id'>;

export interface IAddSurvey {
  add(data: AddSurveyModel): Promise<void>;
}
