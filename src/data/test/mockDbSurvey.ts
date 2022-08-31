import { IAddSurveyRepository } from '@data/interfaces/db/Survey/IAddSurveyRepository';
import { ILoadSurveyByIdRepository } from '@data/interfaces/db/Survey/ILoadSurveyByIdRepository';
import { ILoadSurveysRepository } from '@data/interfaces/db/Survey/ILoadSurveysRepository';
import { SurveyModel } from '@domain/models/Survey';
import { mockSurvey, mockSurveys } from '@domain/test';
import { AddSurveyParams } from '@domain/usecases/Survey/AddSurvey';

export const mockAddSurveyRepositoryStub = (): IAddSurveyRepository => {
  class AddSurveyRepositoryStub implements IAddSurveyRepository {
    public async add(_: AddSurveyParams): Promise<void> {
      return Promise.resolve();
    }
  }
  return new AddSurveyRepositoryStub();
};

export const mockLoadSurveyByIdRepositoryStub =
  (): ILoadSurveyByIdRepository => {
    class LoadSurveyByIdRepositoryStub implements ILoadSurveyByIdRepository {
      public async loadById(_: string): Promise<SurveyModel> {
        return Promise.resolve(mockSurvey());
      }
    }
    return new LoadSurveyByIdRepositoryStub();
  };

export const makeLoadSurveysRepositoryStub = (): ILoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements ILoadSurveysRepository {
    public async loadAll(): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveys());
    }
  }
  return new LoadSurveysRepositoryStub();
};
