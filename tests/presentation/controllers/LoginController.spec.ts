import { MissingParamError } from '@presentation/errors';
import {
  BadRequest,
  InternalError,
  Success,
  Unauthorized,
} from '@presentation/helpers/http';
import { mockAuthentication, mockValidation } from '@tests/presentation/mocks';
import { ThrowError } from '@tests/domain/mocks';
import { LoginController } from '@presentation/controllers';
import { IValidation } from '@presentation/interfaces';
import { IAuthentication } from '@domain/usecases/Authentication';

type SutTypes = {
  sut: LoginController;
  authenticationStub: IAuthentication;
  validationStub: IValidation;
};

const makeSut = (): SutTypes => {
  const authenticationStub = mockAuthentication();
  const validationStub = mockValidation();
  const sut = new LoginController(authenticationStub, validationStub);
  return { sut, authenticationStub, validationStub };
};

const mockRequest = () => ({
  email: 'mail@email.com',
  password: 'any_password',
});

describe('', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, 'auth');
    await sut.handle(mockRequest());

    expect(authSpy).toBeCalledWith({
      email: 'mail@email.com',
      password: 'any_password',
    });
  });

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut();
    jest
      .spyOn(authenticationStub, 'auth')
      .mockReturnValueOnce(Promise.resolve(null));

    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(Unauthorized());
  });

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut();
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(ThrowError);

    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(InternalError(new Error()));
  });

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(
      Success({ accessToken: 'any_token', name: 'any_name' }),
    );
  });

  test('Should call Validation with Correct value', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');

    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest);
  });

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut();

    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'));

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(
      BadRequest(new MissingParamError('any_field')),
    );
  });
});
