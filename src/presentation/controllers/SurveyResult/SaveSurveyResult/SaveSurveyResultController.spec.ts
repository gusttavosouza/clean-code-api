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
});
