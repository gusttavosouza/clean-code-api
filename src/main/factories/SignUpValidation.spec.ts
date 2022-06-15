import { IValidation } from '../../presentation/helpers/Validation/IValidation';
import { RequiredFieldValidation } from '../../presentation/helpers/Validation/RequiredFieldValidation';
import { ValidationComposite } from '../../presentation/helpers/Validation/ValidationComposite';
import { makeSignUpValidation } from './SignUpValidation';

jest.mock('../../presentation/helpers/Validation/ValidationComposite');

describe('SignUpValidation', () => {
  test('Should call ValidationComposite with all validation', () => {
    makeSignUpValidation();

    const validation: IValidation[] = [];
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validation.push(new RequiredFieldValidation(field));
    }
    expect(ValidationComposite).toHaveBeenLastCalledWith(validation);
  });
});
