import { ISurveyModel } from '@presentation/controllers/Survey/LoadSurvey/LoadSurveysControllerProtocols';

export type AddSurveyModel = Omit<ISurveyModel, 'id'>;

export interface IAddSurvey {
  add(data: AddSurveyModel): Promise<void>;
}
