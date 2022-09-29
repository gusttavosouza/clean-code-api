import mockdate from 'mockdate';
import { ISaveSurveyResult } from '@domain/usecases/SaveSurveyResult';
import { ILoadSurveyById } from '@domain/usecases';
import { InvalidParamError } from '@presentation/errors';
import { SaveSurveyResultController } from '@presentation/controllers';
import { Forbidden, InternalError, Success } from '@presentation/helpers/http';
import { IHttpRequest } from '@presentation/interfaces';
import { mockSurveyResult, ThrowError } from '@tests/domain/mocks';
import {
  mockSaveSurveyResult,
  mockSurveyById,
} from '@tests/presentation/mocks';

type SutTypes = {
  sut: SaveSurveyResultController;
  loadSurveyByIdStub: ILoadSurveyById;
  saveSurveyResultStub: ISaveSurveyResult;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockSurveyById();
  const saveSurveyResultStub = mockSaveSurveyResult();
  const saveSurveyResultControllerStub = new SaveSurveyResultController(
    loadSurveyByIdStub,
    saveSurveyResultStub,
  );
  return {
    sut: saveSurveyResultControllerStub,
    loadSurveyByIdStub,
    saveSurveyResultStub,
  };
};

const mockRequest = (): IHttpRequest => ({
  params: {
    surveyId: 'any_id',
    accountId: 'any_id',
    answer: 'any_answer',
  },
  body: {
    answer: 'any_answer',
  },
  accountId: 'any_accountId',
});

describe('SaveSurveyResult Controller', () => {
  beforeAll(() => {
    mockdate.set(new Date());
  });

  afterAll(() => {
    mockdate.reset();
  });

  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById');
    await sut.handle(mockRequest());
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdStub, 'loadById')
      .mockImplementationOnce(() => Promise.resolve(null));

    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(
      Forbidden(new InvalidParamError('Survey not found')),
    );
  });

  test('Should return 500 LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdStub, 'loadById')
      .mockImplementationOnce(ThrowError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(InternalError(new Error()));
  });

  test('Should return 403 if an invalid answer is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({
      params: {
        surveyId: 'any_id',
      },
      body: {
        answer: 'wrong_answer',
      },
    });
    expect(httpResponse).toEqual(Forbidden(new InvalidParamError('answer')));
  });

  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, saveSurveyResultStub } = makeSut();
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save');
    await sut.handle(mockRequest());
    expect(saveSpy).toHaveBeenCalledWith({
      surveyId: 'any_id',
      accountId: 'any_accountId',
      date: new Date(),
      answer: 'any_answer',
    });
  });

  test('Should return 500 SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut();
    jest.spyOn(saveSurveyResultStub, 'save').mockImplementationOnce(ThrowError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(InternalError(new Error()));
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(Success(mockSurveyResult()));
  });
});
