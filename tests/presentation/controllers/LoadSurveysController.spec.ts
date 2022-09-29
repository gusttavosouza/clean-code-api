import mockdate from 'mockdate';

import { mockSurveys, ThrowError } from '@tests/domain/mocks';
import { mockLoadSurveys } from '@tests/presentation/mocks';

import { ILoadSurveys } from '@domain/usecases';
import { InternalError, NoContent, Success } from '@presentation/helpers/http';
import { LoadSurveysController } from '@presentation/controllers';
import { IHttpRequest } from '@presentation/interfaces';

const mockRequest = (): IHttpRequest => ({
  accountId: 'any_account_id',
});

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
    const loadSpy = jest.spyOn(loadSurveysStub, 'load');
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(loadSpy).toHaveBeenCalledWith(httpRequest.accountId);
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(Success(mockSurveys()));
  });

  test('Should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysStub } = makeSut();
    jest
      .spyOn(loadSurveysStub, 'load')
      .mockReturnValueOnce(Promise.resolve([]));
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(NoContent());
  });

  test('Should return 500 LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut();
    jest.spyOn(loadSurveysStub, 'load').mockImplementationOnce(ThrowError);
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(InternalError(new Error()));
  });
});
