import { IAddSurveyRepository } from '@data/interfaces/db/Survey/IAddSurveyRepository';
import { ILoadSurveyByIdRepository } from '@data/interfaces/db/Survey/ILoadSurveyByIdRepository';
import { ILoadSurveysRepository } from '@data/interfaces/db/Survey/ILoadSurveysRepository';
import { SurveyModel } from '@domain/models/Survey';
import { mockSurvey, mockSurveys } from '@domain/test';
import { AddSurveyModel } from '@domain/usecases/Survey/AddSurvey';

export const mockAddSurveyRepositoryStub = (): IAddSurveyRepository => {
  class AddSurveyRepositoryStub implements IAddSurveyRepository {
    public async add(_: AddSurveyModel): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }
  return new AddSurveyRepositoryStub();
};

export const mockLoadSurveyByIdRepositoryStub =
  (): ILoadSurveyByIdRepository => {
    class LoadSurveyByIdRepositoryStub implements ILoadSurveyByIdRepository {
      public async loadById(_: string): Promise<SurveyModel> {
        return new Promise(resolve => resolve(mockSurvey()));
      }
    }
    return new LoadSurveyByIdRepositoryStub();
  };

export const makeLoadSurveysRepositoryStub = (): ILoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements ILoadSurveysRepository {
    public async loadAll(): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(mockSurveys()));
    }
  }
  return new LoadSurveysRepositoryStub();
};
