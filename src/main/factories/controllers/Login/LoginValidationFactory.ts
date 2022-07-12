import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
} from '@validation/Validators';

import EmailValidatorAdapter from '@infra/validators/EmailValidatorAdapter';

export const makeLoginValidation = (): ValidationComposite => {
  return new ValidationComposite([
    new RequiredFieldValidation('email'),
    new RequiredFieldValidation('password'),
    new EmailValidation('email', new EmailValidatorAdapter()),
  ]);
};
