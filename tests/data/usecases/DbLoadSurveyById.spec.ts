import MockDate from 'mockdate';
import { ILoadSurveyByIdRepository } from '@data/interfaces/db';
import { DbLoadSurveyById } from '@data/usecases';
import { mockSurvey, ThrowError } from '@tests/domain/mocks';
import { mockLoadSurveyByIdRepositoryStub } from '@tests/data/mocks';

type SutTypes = {
  sut: DbLoadSurveyById;
  loadSurveyByIdRepositoryStub: ILoadSurveyByIdRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepositoryStub();
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub);
  return { sut, loadSurveyByIdRepositoryStub };
};

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');
    await sut.loadById('any_id');
    expect(loadSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should return Surveys on success', async () => {
    const { sut } = makeSut();
    const survey = await sut.loadById('any_id');
    expect(survey).toEqual(mockSurvey());
  });

  test('should throw if LoadSurveyById throws', async () => {
    const { loadSurveyByIdRepositoryStub, sut } = makeSut();
    jest
      .spyOn(loadSurveyByIdRepositoryStub, 'loadById')
      .mockImplementationOnce(ThrowError);
    const promise = sut.loadById('any_id');
    await expect(promise).rejects.toThrow();
  });
});
