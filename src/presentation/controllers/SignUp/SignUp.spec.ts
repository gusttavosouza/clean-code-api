import { IHttpRequest } from '../../interfaces/IHttp';
import SignUpController from './SignUpController';
import {
  InvalidParamError,
  MissingParamError,
  ServerError,
} from '../../errors';
import {
  IEmailValidator,
  IAccountModel,
  IAddAccount,
  IAddAccountModel,
  IValidation,
} from './SignUpProtocols';
import { BadRequest, InternalError, Success } from '../../helpers';

interface ISutTypes {
  sut: SignUpController;
  emailValidatorStub: IEmailValidator;
  addAccountStub: IAddAccount;
  validationStub: IValidation;
}

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid(_: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

const makeFakeAccount = (): IAccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'valid_password',
});

const makeAddAccount = (): IAddAccount => {
  class AddAccountStub implements IAddAccount {
    async add(_: IAddAccountModel): Promise<IAccountModel> {
      const fakeAccount = makeFakeAccount();

      return new Promise(resolve => resolve(fakeAccount));
    }
  }
  return new AddAccountStub();
};

const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate(_: any): Error {
      return null;
    }
  }
  return new ValidationStub();
};

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
});

const makeSut = (): ISutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const addAccountStub = makeAddAccount();
  const validationStub = makeValidation();
  const sut = new SignUpController(
    emailValidatorStub,
    addAccountStub,
    validationStub,
  );

  return {
    sut,
    emailValidatorStub,
    addAccountStub,
    validationStub,
  };
};

describe('SignUp Controller', () => {
  test('Should return 400 if passwordConfirmation fails', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'invalid_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      BadRequest(new InvalidParamError('passwordConfirmation')),
    );
  });

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(BadRequest(new InvalidParamError('email')));
  });

  test('Should call EmailValidator With correct email', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');

    const httpRequest = makeFakeRequest();

    await sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementation(() => {
      throw new Error();
    });

    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(InternalError(new ServerError(null)));
  });

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut();
    const addSpy = jest.spyOn(addAccountStub, 'add');

    const httpRequest = makeFakeRequest();

    await sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, 'add').mockImplementation(() => {
      return new Promise((_, reject) => reject(new Error()));
    });

    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(InternalError(new ServerError(null)));
  });

  test('Should return 200 valid data is provided', async () => {
    const { sut } = makeSut();

    const httpRequest = makeFakeRequest();
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(Success(makeFakeAccount()));
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

    expect(httpResponse).toEqual(Success(makeFakeAccount()));
  });
});
