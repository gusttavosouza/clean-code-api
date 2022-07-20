import { SignUpController } from '@presentation/controllers/Login/SignUp/SignUpController';
import { IController } from '@presentation/interfaces';
import { makeDbAuthentication } from '@main/factories/usecases/account/authentication/DbAuthenticationFactory';
import { makeDbAddAccount } from '@main/factories/usecases/account/addAccount/DbAddAccountFactory';
import { makeLogControllerDecoratorFactory } from '@main/factories/decorators/LogControllerDecoratorFactory';
import { makeSignUpValidation } from './SignUpValidationFactory';

export const makeSignUpController = (): IController => {
  const signUpController = new SignUpController(
    makeDbAddAccount(),
    makeSignUpValidation(),
    makeDbAuthentication(),
  );
  return makeLogControllerDecoratorFactory(signUpController);
};
