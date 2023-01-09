import { SurveyModel } from '@domain/models/Survey';

export interface IAddSurvey {
  add(data: IAddSurvey.Params): Promise<void>;
}

export namespace IAddSurvey {
  export type Params = Omit<SurveyModel, 'id'>;
}
