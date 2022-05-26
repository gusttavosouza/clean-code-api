import IEmailValidator from '../presentation/interfaces/IEmailValidator';

export default class EmailValidatorAdapter implements IEmailValidator {
  isValid(_: string): boolean {
    return false;
  }
}
