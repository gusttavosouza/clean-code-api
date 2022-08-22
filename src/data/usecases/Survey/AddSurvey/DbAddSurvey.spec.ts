import mockdate from 'mockdate';
import { mockAddSurveyParams, ThrowError } from '@domain/test';
import { mockAddSurveyRepositoryStub } from '@data/test';
import { IAddSurveyRepository } from './DbAddSurveyProtocols';
import { DbAddSurvey } from './DbAddSurvey';

type SutTypes = {
  sut: DbAddSurvey;
  addSurveyRepositoryStub: IAddSurveyRepository;
};

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = mockAddSurveyRepositoryStub();
  const sut = new DbAddSurvey(addSurveyRepositoryStub);
  return {
    sut,
    addSurveyRepositoryStub,
  };
};

describe('DbAddSurvey UseCase', () => {
  beforeAll(() => {
    mockdate.set(new Date());
  });

  afterAll(() => {
    mockdate.reset();
  });
  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');
    const surveyData = mockAddSurveyParams();
    sut.add(surveyData);
    expect(addSpy).toHaveBeenCalledWith(surveyData);
  });

  test('should throw if AddAccountRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    jest
      .spyOn(addSurveyRepositoryStub, 'add')
      .mockImplementationOnce(ThrowError);
    const promise = sut.add(mockAddSurveyParams());
    await expect(promise).rejects.toThrow();
  });
});
