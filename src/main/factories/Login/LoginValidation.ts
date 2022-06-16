import { EmailValidation } from '../../../presentation/helpers/Validation/EmailValidation';
import { RequiredFieldValidation } from '../../../presentation/helpers/Validation/RequiredFieldValidation';
import { ValidationComposite } from '../../../presentation/helpers/Validation/ValidationComposite';
import EmailValidatorAdapter from '../../../utils/EmailValidatorAdapter';

export const makeLoginValidation = (): ValidationComposite => {
  return new ValidationComposite([
    new RequiredFieldValidation('email'),
    new RequiredFieldValidation('password'),
    new EmailValidation('email', new EmailValidatorAdapter()),
  ]);
};
