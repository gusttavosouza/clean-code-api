import { ILoadSurveyByIdRepository } from '@data/interfaces/db/Survey/ILoadSurveyByIdRepository';
import MockDate from 'mockdate';
import { SurveyModel } from '../../../domain/models/Survey';
import { DbLoadSurveyById } from './DbLoadSurveyById';

type SutTypes = {
  sut: DbLoadSurveyById;
  loadSurveyByIdRepositoryStub: ILoadSurveyByIdRepository;
};

const makeFakeSurvey = (): SurveyModel => {
  return {
    id: 'any_id',
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer',
      },
    ],
    date: new Date(),
  };
};

const makeLoadSurveyByIdRepositoryStub = (): ILoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements ILoadSurveyByIdRepository {
    public async loadById(_: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(makeFakeSurvey()));
    }
  }
  return new LoadSurveyByIdRepositoryStub();
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepositoryStub();
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
    expect(survey).toEqual(makeFakeSurvey());
  });

  test('should throw if LoadSurveyById throws', async () => {
    const { loadSurveyByIdRepositoryStub, sut } = makeSut();
    jest
      .spyOn(loadSurveyByIdRepositoryStub, 'loadById')
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));
    const promise = sut.loadById('any_id');
    await expect(promise).rejects.toThrow();
  });
});
