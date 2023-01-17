import { ISaveSurveyResult, ILoadSurveyResult } from '@domain/usecases';
import { mockSurveyResultModel } from '@tests/domain/mocks';

export class SaveSurveyResultSpy implements ISaveSurveyResult {
  params: ISaveSurveyResult.Params;
  result = mockSurveyResultModel();

  async save(
    params: ISaveSurveyResult.Params,
  ): Promise<ISaveSurveyResult.Result> {
    this.params = params;
    return this.result;
  }
}

export class LoadSurveyResultSpy implements ILoadSurveyResult {
  surveyId: string;
  accountId: string;
  result = mockSurveyResultModel();

  async load(
    surveyId: string,
    accountId: string,
  ): Promise<ILoadSurveyResult.Result> {
    this.surveyId = surveyId;
    this.accountId = accountId;
    return this.result;
  }
}
