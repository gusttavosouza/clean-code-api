import { mockSurveys, ThrowError } from '@domain/test';
import { makeLoadSurveysRepositoryStub } from '@data/test';
import { ILoadSurveysRepository } from './DbLoadSurveysProtocols';
import { DbLoadSurveys } from './DbLoadSurveys';

type SutTypes = {
  sut: DbLoadSurveys;
  loadSurveysRepositoryStub: ILoadSurveysRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = makeLoadSurveysRepositoryStub();
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub);
  return { sut, loadSurveysRepositoryStub };
};

describe('DbLoadSurveys', () => {
  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');
    await sut.loadAll();
    expect(loadSpy).toHaveBeenCalled();
  });

  test('Should return a list of Surveys on success', async () => {
    const { sut } = makeSut();
    const surveys = await sut.loadAll();
    expect(surveys).toEqual(mockSurveys());
  });

  test('should throw if LoadSurveys throws', async () => {
    const { loadSurveysRepositoryStub, sut } = makeSut();
    jest
      .spyOn(loadSurveysRepositoryStub, 'loadAll')
      .mockImplementationOnce(ThrowError);
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow();
  });
});
