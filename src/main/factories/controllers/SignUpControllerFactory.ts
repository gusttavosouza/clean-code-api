import { SignUpController } from '@presentation/controllers/Login/SignUp/SignUpController';
import { IController } from '@presentation/interfaces';
import {
  makeDbAuthentication,
  makeDbAddAccount,
} from '@main/factories/usecases';
import { makeLogControllerDecoratorFactory } from '@main/factories/decorators';
import { makeSignUpValidation } from '@main/factories/validation';

export const makeSignUpController = (): IController => {
  const signUpController = new SignUpController(
    makeDbAddAccount(),
    makeSignUpValidation(),
    makeDbAuthentication(),
  );
  return makeLogControllerDecoratorFactory(signUpController);
};
