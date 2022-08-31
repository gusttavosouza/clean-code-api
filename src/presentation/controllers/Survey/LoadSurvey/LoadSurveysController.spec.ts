import mockdate from 'mockdate';
import { mockSurveys, ThrowError } from '@domain/test';
import { InternalError, NoContent, Success } from '@presentation/helpers/http';
import { mockLoadSurveys } from '@presentation/test';
import { LoadSurveysController } from './LoadSurveysController';
import { ILoadSurveys } from './LoadSurveysControllerProtocols';

type SutTypes = {
  sut: LoadSurveysController;
  loadSurveysStub: ILoadSurveys;
};

const makeSut = (): SutTypes => {
  const loadSurveysStub = mockLoadSurveys();
  const sut = new LoadSurveysController(loadSurveysStub);

  return {
    sut,
    loadSurveysStub,
  };
};

describe('AddSurvey Controller', () => {
  beforeAll(() => {
    mockdate.set(new Date());
  });

  afterAll(() => {
    mockdate.reset();
  });

  test('Should call validation with correct values', async () => {
    const { sut, loadSurveysStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveysStub, 'loadAll');
    await sut.handle({});
    expect(loadSpy).toHaveBeenCalled();
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(Success(mockSurveys()));
  });

  test('Should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysStub } = makeSut();
    jest
      .spyOn(loadSurveysStub, 'loadAll')
      .mockReturnValueOnce(Promise.resolve([]));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(NoContent());
  });

  test('Should return 500 LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut();
    jest.spyOn(loadSurveysStub, 'loadAll').mockImplementationOnce(ThrowError);
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(InternalError(new Error()));
  });
});
