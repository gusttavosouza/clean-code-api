import { makeAddSurveyValidation } from '@main/factories';
import {
  ValidationComposite,
  RequiredFieldValidation,
} from '@validation/validators';
import { IValidation } from '@presentation/protocols';

jest.mock('@validation/validators/ValidationComposite');

describe('AddSurveyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation();
    const validations: IValidation[] = [];
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field));
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
