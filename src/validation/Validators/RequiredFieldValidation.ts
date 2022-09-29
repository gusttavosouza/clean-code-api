import { MissingParamError } from '@presentation/errors';
import { IValidation } from '@presentation/interfaces';

export class RequiredFieldValidation implements IValidation {
  constructor(private readonly fieldName: string) {
    this.fieldName = fieldName;
  }

  public validate(input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
    return null;
  }
}
