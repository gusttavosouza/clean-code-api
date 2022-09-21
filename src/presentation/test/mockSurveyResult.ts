import { SurveyModel } from '@domain/models/Survey';
import { SurveyResultModel } from '@domain/models/SurveyResult';
import { mockSurvey, mockSurveyResult } from '@domain/test';
import { ILoadSurveyById } from '@domain/usecases/Survey/LoadSurveyById';
import { ILoadSurveyResult } from '@domain/usecases/SurveyResult/LoadSurveyResult';
import {
  ISaveSurveyResult,
  SaveSurveyResultParams,
} from '@domain/usecases/SurveyResult/SaveSurveyResult';

export const mockSurveyById = (): ILoadSurveyById => {
  class LoadSurveyByIdStub {
    async loadById(_: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurvey());
    }
  }
  return new LoadSurveyByIdStub();
};

export const mockSaveSurveyResult = (): ISaveSurveyResult => {
  class SaveSurveyResultStub implements ISaveSurveyResult {
    async save(_: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResult());
    }
  }
  return new SaveSurveyResultStub();
};

export const mockLoadSurveyResult = (): ILoadSurveyResult => {
  class LoadSurveyResultStub implements ILoadSurveyResult {
    public async load(_: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResult());
    }
  }
  return new LoadSurveyResultStub();
};
