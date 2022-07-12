import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
  CompareFieldsValidation,
} from '@presentation/helpers/Validation';
import { IEmailValidator, IValidation } from '@presentation/interfaces';
import { makeSignUpValidation } from './SignUpValidationFactory';

jest.mock('@presentation/helpers/Validation/ValidationComposite');

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid(_: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe('SignUpValidation', () => {
  test('Should call ValidationComposite with all validation', () => {
    makeSignUpValidation();

    const validation: IValidation[] = [];
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validation.push(new RequiredFieldValidation(field));
    }

    validation.push(
      new CompareFieldsValidation('password', 'passwordConfirmation'),
    );
    validation.push(new EmailValidation('email', makeEmailValidator()));

    expect(ValidationComposite).toHaveBeenLastCalledWith(validation);
  });
});
