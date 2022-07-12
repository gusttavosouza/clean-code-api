import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
  CompareFieldsValidation,
} from '@validation/Validators';
import { IEmailValidator } from '@validation/interfaces/IEmailValidator';
import { IValidation } from '@presentation/interfaces';

import { makeSignUpValidation } from './SignUpValidationFactory';

jest.mock('@validation/Validators/ValidationComposite');

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
