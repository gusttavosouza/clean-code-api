import { mockSurveyResultModel } from '@domain/test';
import { DbLoadSurveyResult } from './DbLoadSurveyResult';
import {
  ILoadSurveyResultRepository,
  SurveyResultModel,
} from './DBLoadSurveyResultProtocols';

type ISut = {
  sut: DbLoadSurveyResult;
  loadSurveyResultRepositoryStub: ILoadSurveyResultRepository;
};

const makeLoadSurveyResultRepositoryStub = () => {
  class LoadSurveyResultRepositoryStub implements ILoadSurveyResultRepository {
    public async loadBySurveyId(_: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }

  return new LoadSurveyResultRepositoryStub();
};

const makeSut = (): ISut => {
  const loadSurveyResultRepositoryStub = makeLoadSurveyResultRepositoryStub();
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub);
  return {
    sut,
    loadSurveyResultRepositoryStub,
  };
};

describe('DbLoadSurveyResult UseCase', () => {
  test('Should call LoadSurveyResultRepository', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const loadSurveyIdSpy = jest.spyOn(
      loadSurveyResultRepositoryStub,
      'loadBySurveyId',
    );
    await sut.load('any_survey_id');
    expect(loadSurveyIdSpy).toHaveBeenCalledWith('any_survey_id');
  });
});
