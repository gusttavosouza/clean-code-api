import { InvalidParamError } from '../../errors';
import { IValidation } from '../../interfaces/IValidation';

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
