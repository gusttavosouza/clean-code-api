import { mockSurveyResultModel, ThrowError } from '@domain/test';
import { InvalidParamError } from '@presentation/errors';
import { Forbidden, InternalError, Success } from '@presentation/helpers/http';
import { mockLoadSurveyResult, mockSurveyById } from '@presentation/test';
import MockDate from 'mockdate';
import { LoadSurveyResultController } from './LoadSurveyResultController';
import {
  IHttpRequest,
  ILoadSurveyById,
  ILoadSurveyResult,
} from './LoadSurveyResultControllerProtocols';

const mockRequest = (): IHttpRequest => ({
  accountId: 'any_account_id',
  params: {
    surveyId: 'any_survey_id',
  },
});

type ISut = {
  sut: LoadSurveyResultController;
  loadSurveyByIdStub: ILoadSurveyById;
  loadSurveyResultStub: ILoadSurveyResult;
};

const makeSut = (): ISut => {
  const loadSurveyByIdStub = mockSurveyById();
  const loadSurveyResultStub = mockLoadSurveyResult();
  const sut = new LoadSurveyResultController(
    loadSurveyByIdStub,
    loadSurveyResultStub,
  );

  return {
    sut,
    loadSurveyByIdStub,
    loadSurveyResultStub,
  };
};

describe('LoadSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    const loadSurveyByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById');
    await sut.handle(mockRequest());
    expect(loadSurveyByIdSpy).toHaveBeenCalledWith('any_survey_id');
  });

  test('Should return 403 if LoadSurveyById return null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdStub, 'loadById')
      .mockReturnValueOnce(Promise.resolve(null));
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(Forbidden(new InvalidParamError('surveyId')));
  });

  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdStub, 'loadById')
      .mockImplementationOnce(ThrowError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(InternalError(new Error()));
  });

  test('Should call LoadSurveyResult with correct values', async () => {
    const { sut, loadSurveyResultStub } = makeSut();
    const loadSurveyByIdSpy = jest.spyOn(loadSurveyResultStub, 'load');
    await sut.handle(mockRequest());
    expect(loadSurveyByIdSpy).toHaveBeenCalledWith(
      'any_survey_id',
      'any_account_id',
    );
  });

  test('Should return 500 if LoadSurveyResult throws', async () => {
    const { sut, loadSurveyResultStub } = makeSut();
    jest.spyOn(loadSurveyResultStub, 'load').mockImplementationOnce(ThrowError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(InternalError(new Error()));
  });

  test('Should return LoadSurvey on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(Success(mockSurveyResultModel()));
  });
});
