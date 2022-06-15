import { IValidation } from './IValidation';

export class ValidationComposite implements IValidation {
  private readonly validations: IValidation[];

  constructor(validations: IValidation[]) {
    this.validations = validations;
  }

  public validate(input: any): Error {
    for (const validation of this.validations) {
      const error = validation.validate(input);
      if (error) {
        return error;
      }
    }
    return null;
  }
}