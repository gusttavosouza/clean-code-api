import { IValidation } from '../../../presentation/interfaces/IValidation';
import { makeLoginValidation } from './LoginValidation';
import { IEmailValidator } from '../../../presentation/interfaces';

import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
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

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validation', () => {
    makeLoginValidation();

    const validation: IValidation[] = [];
    for (const field of ['email', 'password']) {
      validation.push(new RequiredFieldValidation(field));
    }

    validation.push(new EmailValidation('email', makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenLastCalledWith(validation);
  });
});
