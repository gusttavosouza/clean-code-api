import { IValidation } from '@presentation/interfaces';
import { IEmailValidator } from '@validation/interfaces/IEmailValidator';
import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
} from '@validation/Validators';
import { makeLoginValidation } from './LoginValidationFactory';

jest.mock('@validation/Validators/ValidationComposite');

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid(_: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation();

    const validation: IValidation[] = [];
    for (const field of ['email', 'password']) {
      validation.push(new RequiredFieldValidation(field));
    }

    validation.push(new EmailValidation('email', makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenLastCalledWith(validation);
  });
});
