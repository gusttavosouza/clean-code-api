import { InvalidParamError } from '../../errors';
import { IEmailValidator } from '../../interfaces';
import { IValidation } from '../../interfaces/IValidation';

export class EmailValidation implements IValidation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: IEmailValidator,
  ) {
    this.fieldName = fieldName;
    this.emailValidator = emailValidator;
  }

  public validate(input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName]);
    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }

    return null;
  }
}
