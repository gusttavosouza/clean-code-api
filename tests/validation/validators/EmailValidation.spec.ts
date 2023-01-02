import { InvalidParamError } from '@presentation/errors';
import { mockEmailValidator } from '@tests/validation/mocks';
import { IEmailValidator } from '@validation/interfaces';
import { EmailValidation } from '@validation/Validators';

type SutTypes = {
  sut: EmailValidation;
  emailValidatorStub: IEmailValidator;
};

const makeSut = (): SutTypes => {
  const emailValidatorStub = mockEmailValidator();
  const sut = new EmailValidation('email', emailValidatorStub);

  return {
    sut,
    emailValidatorStub,
  };
};

describe('Email Validation', () => {
  test('Should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

    const error = sut.validate({ email: 'any_email@mail.com' });
    expect(error).toEqual(new InvalidParamError('email'));
  });

  test('Should call EmailValidator With correct email', () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
    sut.validate({ email: 'any_email@mail.com' });
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  test('Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementation(() => {
      throw new Error();
    });

    expect(sut.validate).toThrow();
  });
});