import { CompareFieldsValidation } from '../../presentation/helpers/Validation/CompareFieldsValidation';
import { RequiredFieldValidation } from '../../presentation/helpers/Validation/RequiredFieldValidation';
import { ValidationComposite } from '../../presentation/helpers/Validation/ValidationComposite';

export const makeSignUpValidation = (): ValidationComposite => {
  return new ValidationComposite([
    new RequiredFieldValidation('name'),
    new RequiredFieldValidation('email'),
    new RequiredFieldValidation('password'),
    new RequiredFieldValidation('passwordConfirmation'),
    new CompareFieldsValidation('password', 'passwordConfirmation'),
  ]);
};
