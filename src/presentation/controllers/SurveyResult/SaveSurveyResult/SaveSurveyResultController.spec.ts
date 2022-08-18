import { InvalidParamError } from '@presentation/errors';
import { Forbidden, InternalError } from '@presentation/helpers/http';
import { SaveSurveyResultController } from './SaveSurveyResultController';
import {
  IHttpRequest,
  ILoadSurveyById,
  SurveyModel,
} from './SaveSurveyResultControllerProtocols';

type SutTypes = {
  sut: SaveSurveyResultController;
  loadSurveyByIdStub: ILoadSurveyById;
};

const makeFakeRequest = (): IHttpRequest => ({
  params: {
    surveyId: 'any_id',
    accountId: 'any_id',
    answer: 'any_answer',
  },
  body: {
    answer: 'any_answer',
  },
});

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

const makeLoadSurveyById = (): ILoadSurveyById => {
  class LoadSurveyByIdStub {
    async loadById(_: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(makeFakeSurvey()));
    }
  }
  return new LoadSurveyByIdStub();
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = makeLoadSurveyById();
  const saveSurveyResultControllerStub = new SaveSurveyResultController(
    loadSurveyByIdStub,
  );
  return { sut: saveSurveyResultControllerStub, loadSurveyByIdStub };
};

describe('SaveSurveyResult Controller', () => {
  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById');
    sut.handle(makeFakeRequest());
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdStub, 'loadById')
      .mockImplementationOnce(() => new Promise(resolve => resolve(null)));

    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(
      Forbidden(new InvalidParamError('Survey not found')),
    );
  });

  test('Should return 500 LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdStub, 'loadById')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const httpResponse = await sut.handle(makeFakeRequest());
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
});
