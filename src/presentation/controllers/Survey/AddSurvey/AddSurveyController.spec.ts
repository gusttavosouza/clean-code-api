import { BadRequest } from '@presentation/helpers/http';
import {
  IHttpRequest,
  IValidation,
  IAddSurvey,
  IAddSurveyModel,
} from './AddSurveyControllerProtocols';
import { AddSurveyController } from './AddSurveyController';

interface ISutTypes {
  sut: AddSurveyController;
  validationStub: IValidation;
  addSurveyStub: IAddSurvey;
}

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer',
      },
    ],
  },
});

const makeFakeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate(_: any): Error {
      return null;
    }
  }

  return new ValidationStub();
};

const makeFakeAddSurveyStub = (): IAddSurvey => {
  class AddSurveyStub implements IAddSurvey {
    async add(_: IAddSurveyModel): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }
  return new AddSurveyStub();
};

const makeSut = (): ISutTypes => {
  const validationStub = makeFakeValidation();
  const addSurveyStub = makeFakeAddSurveyStub();
  const sut = new AddSurveyController(validationStub, addSurveyStub);

  return {
    sut,
    validationStub,
    addSurveyStub,
  };
};

describe('AddSurvey Controller', () => {
  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error());
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(BadRequest(new Error()));
  });

  test('Should call AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut();
    const addSpy = jest.spyOn(addSurveyStub, 'add');
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
