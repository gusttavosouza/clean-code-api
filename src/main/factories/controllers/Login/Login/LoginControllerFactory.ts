import { LoginController } from '@presentation/controllers/Login/Login/LoginController';
import { IController } from '@presentation/interfaces';
import { makeDbAuthentication } from '@main/factories/usecases/authentication/DbAuthenticationFactory';
import { makeLogControllerDecoratorFactory } from '@main/factories/decorators/LogControllerDecoratorFactory';
import { makeLoginValidation } from './LoginValidationFactory';

export const makeLoginController = (): IController => {
  const loginController = new LoginController(
    makeDbAuthentication(),
    makeLoginValidation(),
  );
  return makeLogControllerDecoratorFactory(loginController);
};
