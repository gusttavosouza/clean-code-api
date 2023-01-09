import {
  IAddSurveyRepository,
  ILoadSurveyByIdRepository,
  ILoadSurveysRepository,
} from '@data/interfaces/db';
import { SurveyModel } from '@domain/models/Survey';
import { IAddSurvey } from '@domain/usecases';
import { mockSurvey, mockSurveys } from '@tests/domain/mocks';

export const mockAddSurveyRepositoryStub = (): IAddSurveyRepository => {
  class AddSurveyRepositoryStub implements IAddSurveyRepository {
    public async add(_: IAddSurvey.Params): Promise<void> {
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
