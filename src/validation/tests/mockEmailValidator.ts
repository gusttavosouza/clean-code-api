import { IEmailValidator } from '@validation/interfaces/IEmailValidator';

export const mockEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid(_: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};
