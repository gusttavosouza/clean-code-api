import { DbAuthentication } from '@data/usecases/Authentication/DbAuthentication';
import { BcryptAdapter } from '@infra/criptography/BcryptAdapter/BcryptAdapter';
import { AccountMongoRepository } from '@infra/db/mongodb/AccountRepository/AccountRepository';
import { LogErrorMongoRepository } from '@infra/db/mongodb/LogErrorRepository/LogErrorMongoRepository';
import { LogControllerDecorator } from '@main/decorators/LogControllerDecorator';
import { LoginController } from '@presentation/controllers/Login/LoginController';
import { IController } from '@presentation/interfaces';
import { JwtAdapter } from '@infra/criptography/JwtAdapter/JwtAdapter';
import env from '@main/config/env';
import { makeLoginValidation } from './LoginValidationFactory';

export const makeLoginController = (): IController => {
  const bcryptAdapter = new BcryptAdapter(env.salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  const authentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository,
  );
  const loginController = new LoginController(
    authentication,
    makeLoginValidation(),
  );
  const logErrorMongoRepository = new LogErrorMongoRepository();
  return new LogControllerDecorator(loginController, logErrorMongoRepository);
};
