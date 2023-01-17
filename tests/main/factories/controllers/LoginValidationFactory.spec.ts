import { makeLoginValidation } from '@main/factories';
import {
  ValidationComposite,
  RequiredFieldValidation,
  EmailValidation,
} from '@validation/validators';
import { IValidation } from '@presentation/protocols';
import { EmailValidatorAdapter } from '@infra/validators';

jest.mock('@/validation/validators/validation-composite');

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation();
    const validations: IValidation[] = [];
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
