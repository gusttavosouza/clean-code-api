import { MissingParamError } from '@presentation/errors';
import { IAuthenticationModel } from '@domain/usecases/IAuthentication';
import {
  BadRequest,
  InternalError,
  Success,
  Unauthorized,
} from '@presentation/helpers/http';
import { LoginController } from './LoginController';
import {
  IHttpRequest,
  IAuthentication,
  IValidation,
} from './LoginControllerProtocols';

interface ISutTypes {
  sut: LoginController;
  authenticationStub: IAuthentication;
  validationStub: IValidation;
}

const makeAuthentication = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    async auth(_: IAuthenticationModel): Promise<string> {
      return new Promise(resolve => resolve('any_token'));
    }
  }

  return new AuthenticationStub();
};

const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate(_: any): Error {
      return null;
    }
  }
  return new ValidationStub();
};
const makeSut = (): ISutTypes => {
  const authenticationStub = makeAuthentication();
  const validationStub = makeValidation();
  const sut = new LoginController(authenticationStub, validationStub);
  return { sut, authenticationStub, validationStub };
};

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    email: 'mail@email.com',
    password: 'any_password',
  },
});

describe('', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, 'auth');
    await sut.handle(makeFakeRequest());

    expect(authSpy).toBeCalledWith({
      email: 'mail@email.com',
      password: 'any_password',
    });
  });

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut();
    jest
      .spyOn(authenticationStub, 'auth')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)));

    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(Unauthorized());
  });

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut();
    jest
      .spyOn(authenticationStub, 'auth')
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));

    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(InternalError(new Error()));
  });

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(Success({ accessToken: 'any_token' }));
  });

  test('Should call Validation with Correct value', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');

    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut();

    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'));

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(
      BadRequest(new MissingParamError('any_field')),
    );
  });
});
