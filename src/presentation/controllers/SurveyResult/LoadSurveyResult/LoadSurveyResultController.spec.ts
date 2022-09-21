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
});
