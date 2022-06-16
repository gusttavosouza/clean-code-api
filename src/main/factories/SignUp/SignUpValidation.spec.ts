import { IValidation } from '../../../presentation/interfaces/IValidation';
import { makeSignUpValidation } from './SignUpValidation';
import { IEmailValidator } from '../../../presentation/interfaces';

import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
  CompareFieldsValidation,
} from '../../../presentation/helpers/Validation';

jest.mock('../../../presentation/helpers/Validation/ValidationComposite');

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
