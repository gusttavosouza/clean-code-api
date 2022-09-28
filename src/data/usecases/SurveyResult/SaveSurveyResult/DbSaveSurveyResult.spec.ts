import mockdate from 'mockdate';
import {
  mockSurveyResultModel,
  mockSaveSurveyResultParams,
  ThrowError,
} from '@domain/test';
import {
  mockLoadSurveyResultRepositoryStub,
  mockSaveSurveyResultRepositoryStub,
} from '@data/test';
import {
  ISaveSurveyResultRepository,
  ILoadSurveyResultRepository,
} from './DbSaveSurveyResultProtocols';
import { DbSaveSurveyResult } from './DbSaveSurveyResult';

type SutTypes = {
  sut: DbSaveSurveyResult;
  saveSurveyResultRepositoryStub: ISaveSurveyResultRepository;
  loadSurveyResultRepositoryStub: ILoadSurveyResultRepository;
};

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepositoryStub();
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepositoryStub();
  const sut = new DbSaveSurveyResult(
    saveSurveyResultRepositoryStub,
    loadSurveyResultRepositoryStub,
  );
  return {
    sut,
    saveSurveyResultRepositoryStub,
    loadSurveyResultRepositoryStub,
  };
};

describe('DbAddSurvey UseCase', () => {
  beforeAll(() => {
    mockdate.set(new Date());
  });

  afterAll(() => {
    mockdate.reset();
  });

  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save');
    const surveyResultData = mockSaveSurveyResultParams();
    sut.save(surveyResultData);
    expect(addSpy).toHaveBeenCalledWith(surveyResultData);
  });

  test('should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(saveSurveyResultRepositoryStub, 'save')
      .mockImplementationOnce(ThrowError);
    const promise = sut.save(mockSaveSurveyResultParams());
    await expect(promise).rejects.toThrow();
  });

  test('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const loadBySurveyId = jest.spyOn(
      loadSurveyResultRepositoryStub,
      'loadBySurveyId',
    );
    const surveyResultData = mockSaveSurveyResultParams();
    await sut.save(surveyResultData);
    expect(loadBySurveyId).toHaveBeenCalledWith(
      surveyResultData.surveyId,
      surveyResultData.accountId,
    );
  });

  test('should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockImplementationOnce(ThrowError);
    const promise = sut.save(mockSaveSurveyResultParams());
    await expect(promise).rejects.toThrow();
  });

  test('Should return SurveyResult on success', async () => {
    const { sut } = makeSut();
    const survey = await sut.save(mockSaveSurveyResultParams());
    expect(survey).toEqual(mockSurveyResultModel());
  });
});
