import {
  BadRequest,
  InternalError,
  NoContent,
} from '@presentation/helpers/http';
import { AddSurveyController } from './AddSurveyController';
import {
  IHttpRequest,
  IValidation,
  IAddSurvey,
  IAddSurveyModel,
} from './AddSurveyControllerProtocols';

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

  test('Should return 500 AddSurvey throws', async () => {
    const { sut, addSurveyStub } = makeSut();
    jest
      .spyOn(addSurveyStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(InternalError(new Error()));
  });

  test('Should return 204 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(NoContent());
  });
});
