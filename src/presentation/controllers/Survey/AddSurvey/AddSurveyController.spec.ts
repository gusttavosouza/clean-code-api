import { IHttpRequest, IValidation } from '@presentation/interfaces';
import { AddSurveyController } from './AddSurveyController';

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

describe('AddSurvey Controller', () => {
  test('Should call validation with correct values', async () => {
    const validationStub = makeFakeValidation();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const sut = new AddSurveyController(validationStub);
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
