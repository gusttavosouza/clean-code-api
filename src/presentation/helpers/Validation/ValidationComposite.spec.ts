import { IValidation } from './IValidation';
import { MissingParamError } from '../../errors';
import { ValidationComposite } from './ValidationComposite';

const makeValidationStub = (): IValidation => {
  class ValidationStub implements IValidation {
    validate(_: any): Error {
      return new MissingParamError('field');
    }
  }
  return new ValidationStub();
};

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const validationStub = makeValidationStub();
    const sut = new ValidationComposite([validationStub]);
    const error = sut.validate({ field: 'any_value' });
    expect(error).toEqual(new MissingParamError('field'));
  });
});
