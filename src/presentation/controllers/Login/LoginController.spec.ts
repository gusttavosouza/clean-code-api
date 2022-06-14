import { InvalidParamError, MissingParamError } from '../../errors';
import { BadRequest, InternalError } from '../../helpers';
import { IEmailValidator, IHttpRequest } from '../../interfaces';
import { LoginController } from './LoginController';

interface ISutTypes {
  sut: LoginController;
  emailValidatorStub: IEmailValidator;
}

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid(_: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

const makeSut = (): ISutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const sut = new LoginController(emailValidatorStub);
  return {
    sut,
    emailValidatorStub,
  };
};

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    email: 'mail@email.com',
    password: 'any_password',
  },
});

describe('', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: 'any_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(BadRequest(new MissingParamError('email')));
  });

  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'mail@email.com',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(BadRequest(new MissingParamError('password')));
  });

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(BadRequest(new InvalidParamError('email')));
  });

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const spyIsValid = jest.spyOn(emailValidatorStub, 'isValid');
    await sut.handle(makeFakeRequest());

    expect(spyIsValid).toBeCalledWith('mail@email.com');
  });

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(InternalError(new Error()));
  });
});
