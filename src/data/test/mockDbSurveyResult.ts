import { ILoadSurveyResultRepository } from '@data/interfaces/db/SurveyResult/ILoadSurveyResultRepository';
import { ISaveSurveyResultRepository } from '@data/interfaces/db/SurveyResult/ISaveSurveyResultRepository';
import { SurveyResultModel } from '@domain/models/SurveyResult';
import { mockSurveyResultModel } from '@domain/test';
import { SaveSurveyResultParams } from '@domain/usecases/SurveyResult/SaveSurveyResult';

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
    public async loadBySurveyId(_: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }

  return new LoadSurveyResultRepositoryStub();
};
