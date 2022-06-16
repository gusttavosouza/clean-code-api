import { EmailValidation } from '../../../presentation/helpers/Validation/EmailValidation';
import { CompareFieldsValidation } from '../../../presentation/helpers/Validation/CompareFieldsValidation';
import { IValidation } from '../../../presentation/helpers/Validation/IValidation';
import { RequiredFieldValidation } from '../../../presentation/helpers/Validation/RequiredFieldValidation';
import { ValidationComposite } from '../../../presentation/helpers/Validation/ValidationComposite';
import { makeSignUpValidation } from './SignUpValidation';
import { IEmailValidator } from '../../../presentation/interfaces';

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
