import { mockLoadSurveyResultRepositoryStub } from '@data/test';
import { ThrowError, mockSurveyResultModel } from '@domain/test';
import { DbLoadSurveyResult } from './DbLoadSurveyResult';
import { ILoadSurveyResultRepository } from './DBLoadSurveyResultProtocols';

type ISut = {
  sut: DbLoadSurveyResult;
  loadSurveyResultRepositoryStub: ILoadSurveyResultRepository;
};

const makeSut = (): ISut => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepositoryStub();
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

  test('should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockImplementationOnce(ThrowError);
    const promise = sut.load('any_survey_id');
    await expect(promise).rejects.toThrow();
  });

  test('Should return SurveyResultModel on success', async () => {
    const { sut } = makeSut();
    const surveyResult = await sut.load('any_survey_id');
    await expect(surveyResult).toEqual(mockSurveyResultModel());
  });
});
