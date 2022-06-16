import { MissingParamError } from '../../errors';
import { RequiredFieldValidation } from './RequiredFieldValidation';

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('any_field');
    const error = sut.validate({ name: 'any_name' });
    expect(error).toEqual(new MissingParamError('any_field'));
  });

  test('Should not return if validation success', () => {
    const sut = new RequiredFieldValidation('any_field');
    const error = sut.validate({ any_field: 'any_name' });
    expect(error).toBeFalsy();
  });
});
