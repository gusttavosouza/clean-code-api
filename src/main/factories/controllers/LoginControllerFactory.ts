import { LoginController } from '@presentation/controllers';
import { IController } from '@presentation/interfaces';
import { makeDbAuthentication } from '@main/factories/usecases';
import { makeLogControllerDecoratorFactory } from '@main/factories/decorators';
import { makeLoginValidation } from '@main/factories/validation';

export const makeLoginController = (): IController => {
  const loginController = new LoginController(
    makeDbAuthentication(),
    makeLoginValidation(),
  );
  return makeLogControllerDecoratorFactory(loginController);
};
