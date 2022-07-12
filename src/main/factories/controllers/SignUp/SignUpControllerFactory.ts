import { SignUpController } from '@presentation/controllers/SignUp/SignUpController';
import { IController } from '@presentation/interfaces';
import { makeDbAuthentication } from '@main/factories/usecases/authentication/DbAuthenticationFactory';
import { makeDbAddAccount } from '@main/factories/usecases/addAccount/DbAddAccountFactory';
import { makeLogControllerDecoratorFactory } from '@main/factories/usecases/decorators/LogControllerDecoratorFactory';
import { makeSignUpValidation } from './SignUpValidationFactory';

export const makeSignUpController = (): IController => {
  const signUpController = new SignUpController(
    makeDbAddAccount(),
    makeSignUpValidation(),
    makeDbAuthentication(),
  );
  return makeLogControllerDecoratorFactory(signUpController);
};
