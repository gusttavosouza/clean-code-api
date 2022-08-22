import { ISaveSurveyResultRepository } from '@data/interfaces/db/SurveyResult/ISaveSurveyResultRepository';
import { SurveyResultModel } from '@domain/models/SurveyResult';
import { mockSurveyResult } from '@domain/test';
import { SaveSurveyResultModel } from '@domain/usecases/SurveyResult/SaveSurveyResult';

export const mockSaveSurveyResultRepositoryStub =
  (): ISaveSurveyResultRepository => {
    class AddSurveyRepositoryStub implements ISaveSurveyResultRepository {
      public async save(_: SaveSurveyResultModel): Promise<SurveyResultModel> {
        return new Promise(resolve => resolve(mockSurveyResult()));
      }
    }
    return new AddSurveyRepositoryStub();
  };
