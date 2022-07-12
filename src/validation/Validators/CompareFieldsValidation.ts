import { InvalidParamError } from '@presentation/errors';
import { IValidation } from '@presentation/interfaces/IValidation';

export class CompareFieldsValidation implements IValidation {
  constructor(
    private readonly fieldName: string,
    private readonly fieldToCompareName: string,
  ) {
    this.fieldName = fieldName;
    this.fieldToCompareName = fieldToCompareName;
  }

  public validate(input: any): Error {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName);
    }
    return null;
  }
}
