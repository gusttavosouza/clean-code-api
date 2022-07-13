import {
  ValidationComposite,
  RequiredFieldValidation,
} from '@validation/Validators';

export const makeAddSurveyValidation = (): ValidationComposite => {
  return new ValidationComposite([
    new RequiredFieldValidation('question'),
    new RequiredFieldValidation('answers'),
  ]);
};
