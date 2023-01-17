import {
  ISaveSurveyResultRepository,
  ILoadSurveyResultRepository,
} from '@data/protocols';
import { mockSurveyResultModel } from '@tests/domain/mocks';

export class SaveSurveyResultRepositorySpy
  implements ISaveSurveyResultRepository
{
  params: ISaveSurveyResultRepository.Params;

  async save(params: ISaveSurveyResultRepository.Params): Promise<void> {
    this.params = params;
  }
}

export class LoadSurveyResultRepositorySpy
  implements ILoadSurveyResultRepository
{
  surveyId: string;
  accountId: string;
  result = mockSurveyResultModel();

  async loadBySurveyId(
    surveyId: string,
    accountId: string,
  ): Promise<ILoadSurveyResultRepository.Result> {
    this.surveyId = surveyId;
    this.accountId = accountId;
    return this.result;
  }
}
