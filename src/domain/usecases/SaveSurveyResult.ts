import { SurveyResultModel } from '@domain/models/SurveyResult';

export interface ISaveSurveyResult {
  save(data: ISaveSurveyResult.Params): Promise<SurveyResultModel>;
}

export namespace ISaveSurveyResult {
  export type Params = {
    surveyId: string;
    accountId: string;
    answer: string;
    date: Date;
  };

  export type Result = SurveyResultModel;
}
