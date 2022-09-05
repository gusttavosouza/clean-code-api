import { ISaveSurveyResultRepository } from '@data/interfaces/db/SurveyResult/ISaveSurveyResultRepository';
import { SurveyResultModel } from '@domain/models/SurveyResult';
import { mockSurveyResult } from '@domain/test';
import { SaveSurveyResultParams } from '@domain/usecases/SurveyResult/SaveSurveyResult';

export const mockSaveSurveyResultRepositoryStub =
  (): ISaveSurveyResultRepository => {
    class AddSurveyRepositoryStub implements ISaveSurveyResultRepository {
      public async save(_: SaveSurveyResultParams): Promise<SurveyResultModel> {
        return Promise.resolve(mockSurveyResult());
      }
    }
    return new AddSurveyRepositoryStub();
  };
