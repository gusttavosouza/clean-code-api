import { ThrowError } from '@domain/test';
import { InvalidParamError } from '@presentation/errors';
import { Forbidden, InternalError } from '@presentation/helpers/http';
import { mockSurveyById } from '@presentation/test';
import { LoadSurveyResultController } from './LoadSurveyResultController';
import {
  IHttpRequest,
  ILoadSurveyById,
} from './LoadSurveyResultControllerProtocols';

const mockRequest = (): IHttpRequest => ({
  params: {
    surveyId: 'any_id',
  },
});

type ISut = {
  sut: LoadSurveyResultController;
  loadSurveyByIdStub: ILoadSurveyById;
};

const makeSut = (): ISut => {
  const loadSurveyByIdStub = mockSurveyById();
  const sut = new LoadSurveyResultController(loadSurveyByIdStub);

  return {
    sut,
    loadSurveyByIdStub,
  };
};

describe('LoadSurveyResult Controller', () => {
  test('Should call LoadSurveyResult with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    const loadSurveyByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById');
    await sut.handle(mockRequest());
    expect(loadSurveyByIdSpy).toHaveBeenCalledWith('any_id');
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
});
