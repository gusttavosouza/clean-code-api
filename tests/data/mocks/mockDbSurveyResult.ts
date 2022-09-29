import {
  ILoadSurveyResultRepository,
  ISaveSurveyResultRepository,
} from '@data/interfaces/db';
import { SurveyResultModel } from '@domain/models/SurveyResult';
import { SaveSurveyResultParams } from '@domain/usecases/SaveSurveyResult';
import { mockSurveyResultModel } from '@tests/domain/mocks';

export const mockSaveSurveyResultRepositoryStub =
  (): ISaveSurveyResultRepository => {
    class AddSurveyRepositoryStub implements ISaveSurveyResultRepository {
      public async save(_: SaveSurveyResultParams): Promise<void> {
        return Promise.resolve();
      }
    }
    return new AddSurveyRepositoryStub();
  };

export const mockLoadSurveyResultRepositoryStub = () => {
  class LoadSurveyResultRepositoryStub implements ILoadSurveyResultRepository {
    public async loadBySurveyId(
      _: string,
      __: string,
    ): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }

  return new LoadSurveyResultRepositoryStub();
};
