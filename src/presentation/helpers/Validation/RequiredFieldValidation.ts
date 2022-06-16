import { MissingParamError } from '../../errors';
import { IValidation } from '../../interfaces/IValidation';

export class RequiredFieldValidation implements IValidation {
  private readonly fieldName: string;

  constructor(fieldName: string) {
    this.fieldName = fieldName;
  }

  public validate(input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
    return null;
  }
}
