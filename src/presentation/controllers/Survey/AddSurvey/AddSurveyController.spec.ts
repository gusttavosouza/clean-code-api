import mockdate from 'mockdate';
import {
  BadRequest,
  InternalError,
  NoContent,
} from '@presentation/helpers/http';
import { ThrowError } from '@domain/test';
import { mockAddSurvey, mockValidation } from '@presentation/test';
import { AddSurveyController } from './AddSurveyController';
import {
  IHttpRequest,
  IValidation,
  IAddSurvey,
} from './AddSurveyControllerProtocols';

type SutTypes = {
  sut: AddSurveyController;
  validationStub: IValidation;
  addSurveyStub: IAddSurvey;
};

const makeSut = (): SutTypes => {
  const validationStub = mockValidation();
  const addSurveyStub = mockAddSurvey();
  const sut = new AddSurveyController(validationStub, addSurveyStub);

  return {
    sut,
    validationStub,
    addSurveyStub,
  };
};

const mockRequest = (): IHttpRequest => ({
  body: {
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer',
      },
    ],
    date: new Date(),
  },
});

describe('AddSurvey Controller', () => {
  beforeAll(() => {
    mockdate.set(new Date());
  });

  afterAll(() => {
    mockdate.reset();
  });

  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error());
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(BadRequest(new Error()));
  });

  test('Should call AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut();
    const addSpy = jest.spyOn(addSurveyStub, 'add');
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('Should return 500 AddSurvey throws', async () => {
    const { sut, addSurveyStub } = makeSut();
    jest.spyOn(addSurveyStub, 'add').mockImplementationOnce(ThrowError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(InternalError(new Error()));
  });

  test('Should return 204 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(NoContent());
  });
});
