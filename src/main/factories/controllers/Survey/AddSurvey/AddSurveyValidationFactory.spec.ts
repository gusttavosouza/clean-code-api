import { IValidation } from '@presentation/interfaces';
import {
  ValidationComposite,
  RequiredFieldValidation,
} from '@validation/Validators';
import { makeAddSurveyValidation } from './AddSurveyValidationFactory';

jest.mock('@validation/Validators/ValidationComposite');

describe('AddSurvey Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation();

    const validation: IValidation[] = [];
    for (const field of ['question', 'answers']) {
      validation.push(new RequiredFieldValidation(field));
    }
    expect(ValidationComposite).toHaveBeenLastCalledWith(validation);
  });
});
