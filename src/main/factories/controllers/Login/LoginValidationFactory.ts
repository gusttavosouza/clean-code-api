import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
} from '@presentation/helpers/Validation';

import EmailValidatorAdapter from '@main/adapters/validators/EmailValidatorAdapter';

export const makeLoginValidation = (): ValidationComposite => {
  return new ValidationComposite([
    new RequiredFieldValidation('email'),
    new RequiredFieldValidation('password'),
    new EmailValidation('email', new EmailValidatorAdapter()),
  ]);
};
