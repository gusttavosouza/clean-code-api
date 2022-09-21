import { ILoadSurveyByIdRepository } from '@data/interfaces/db/Survey/ILoadSurveyByIdRepository';
import {
  mockLoadSurveyByIdRepositoryStub,
  mockLoadSurveyResultRepositoryStub,
} from '@data/test';
import { ThrowError, mockSurveyResultModel } from '@domain/test';
import { DbLoadSurveyResult } from './DbLoadSurveyResult';
import { ILoadSurveyResultRepository } from './DBLoadSurveyResultProtocols';

type ISut = {
  sut: DbLoadSurveyResult;
  loadSurveyResultRepositoryStub: ILoadSurveyResultRepository;
  loadSurveyByIdRepositoryStub: ILoadSurveyByIdRepository;
};

const makeSut = (): ISut => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepositoryStub();
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepositoryStub();
  const sut = new DbLoadSurveyResult(
    loadSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub,
  );
  return {
    sut,
    loadSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub,
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

  test('should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockImplementationOnce(ThrowError);
    const promise = sut.load('any_survey_id');
    await expect(promise).rejects.toThrow();
  });

  test('Should call LoadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
    const {
      sut,
      loadSurveyResultRepositoryStub,
      loadSurveyByIdRepositoryStub,
    } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockReturnValueOnce(Promise.resolve(null));

    await sut.load('any_survey_id');
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id');
  });

  test('Should return SurveyResultModel on success', async () => {
    const { sut } = makeSut();
    const surveyResult = await sut.load('any_survey_id');
    await expect(surveyResult).toEqual(mockSurveyResultModel());
  });
});
