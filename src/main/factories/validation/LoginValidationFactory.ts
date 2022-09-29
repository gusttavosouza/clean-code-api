import { EmailValidatorAdapter } from '@infra/validators';
import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
} from '@validation/Validators';

export const makeLoginValidation = (): ValidationComposite => {
  return new ValidationComposite([
    new RequiredFieldValidation('email'),
    new RequiredFieldValidation('password'),
    new EmailValidation('email', new EmailValidatorAdapter()),
  ]);
};
