import { SurveyModel } from '@domain/models/Survey';
import { SurveyResultModel } from '@domain/models/SurveyResult';
import { ILoadSurveyById } from '@domain/usecases/LoadSurveyById';
import { ILoadSurveyResult } from '@domain/usecases/LoadSurveyResult';
import {
  ISaveSurveyResult,
  SaveSurveyResultParams,
} from '@domain/usecases/SaveSurveyResult';
import { mockSurvey, mockSurveyResult } from '../tests/domain/test';

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
    public async load(_: string, __: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResult());
    }
  }
  return new LoadSurveyResultStub();
};
