import { InvalidParamError } from '@presentation/errors';
import { IEmailValidator, IValidation } from '@presentation/interfaces';

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
