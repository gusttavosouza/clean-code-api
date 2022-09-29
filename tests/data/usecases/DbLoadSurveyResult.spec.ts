import {
  ILoadSurveyByIdRepository,
  ILoadSurveyResultRepository,
} from '@data/interfaces/db';
import MockDate from 'mockdate';
import { DbLoadSurveyResult } from '@data/usecases';
import { ThrowError, mockSurveyResultModel } from '@tests/domain/mocks';
import {
  mockLoadSurveyByIdRepositoryStub,
  mockLoadSurveyResultRepositoryStub,
} from '@tests/data/mocks';

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
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveyResultRepository', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const loadSurveyIdSpy = jest.spyOn(
      loadSurveyResultRepositoryStub,
      'loadBySurveyId',
    );
    await sut.load('any_survey_id', 'any_account_id');
    expect(loadSurveyIdSpy).toHaveBeenCalledWith(
      'any_survey_id',
      'any_account_id',
    );
  });

  test('should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockImplementationOnce(ThrowError);
    const promise = sut.load('any_survey_id', 'any_account_id');
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

    await sut.load('any_survey_id', 'any_account_id');
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id');
  });

  test('Should call LoadSurveyByIdRepository if all answers count 0 if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockReturnValueOnce(Promise.resolve(null));
    const surveyResult = await sut.load('any_id', 'any_account_id');
    await expect(surveyResult).toEqual(mockSurveyResultModel());
  });

  test('Should return SurveyResultModel on success', async () => {
    const { sut } = makeSut();
    const surveyResult = await sut.load('any_survey_id', 'any_account_id');
    await expect(surveyResult).toEqual(mockSurveyResultModel());
  });
});
