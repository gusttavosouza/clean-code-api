import { SurveyModel } from '@domain/models/Survey';
import { SurveyResultModel } from '@domain/models/SurveyResult';
import { mockSurvey, mockSurveyResult } from '@domain/test';
import { ILoadSurveyById } from '@domain/usecases/Survey/LoadSurveyById';
import {
  ISaveSurveyResult,
  SaveSurveyResultModel,
} from '@domain/usecases/SurveyResult/SaveSurveyResult';

export const mockSurveyById = (): ILoadSurveyById => {
  class LoadSurveyByIdStub {
    async loadById(_: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(mockSurvey()));
    }
  }
  return new LoadSurveyByIdStub();
};

export const mockSaveSurveyResult = (): ISaveSurveyResult => {
  class SaveSurveyResultStub implements ISaveSurveyResult {
    async save(_: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(mockSurveyResult()));
    }
  }
  return new SaveSurveyResultStub();
};
