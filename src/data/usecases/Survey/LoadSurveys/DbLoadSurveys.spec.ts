import { mockSurveys, ThrowError } from '@domain/test';
import { makeLoadSurveysRepositoryStub } from '@data/test';
import MockDate from 'mockdate';
import { ILoadSurveysRepository } from './DbLoadSurveysProtocols';
import { DbLoadSurveys } from './DbLoadSurveys';

type SutTypes = {
  sut: DbLoadSurveys;
  loadSurveysRepositoryStub: ILoadSurveysRepository;
  accountId: string;
};

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = makeLoadSurveysRepositoryStub();
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub);
  const accountId = 'any_account_id';
  return { sut, loadSurveysRepositoryStub, accountId };
};

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub, accountId } = makeSut();
    const loadSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');
    await sut.load(accountId);
    expect(loadSpy).toHaveBeenCalled();
  });

  test('Should return a list of Surveys on success', async () => {
    const { sut, accountId } = makeSut();
    const surveys = await sut.load(accountId);
    expect(surveys).toEqual(mockSurveys());
  });

  test('should throw if LoadSurveys throws', async () => {
    const { loadSurveysRepositoryStub, sut, accountId } = makeSut();
    jest
      .spyOn(loadSurveysRepositoryStub, 'loadAll')
      .mockImplementationOnce(ThrowError);
    const promise = sut.load(accountId);
    await expect(promise).rejects.toThrow();
  });
});
