import { LogErrorMongoRepository } from '../../../infra/db/mongodb/LogErrorRepository/LogErrorMongoRepository';
import { BcryptAdapter } from '../../../infra/criptography/BcryptAdapter/BcryptAdapter';
import DbAddAccount from '../../../data/usecases/AddAccount/DbAddAccount';
import SignUpController from '../../../presentation/controllers/SignUp/SignUpController';
import { AccountMongoRepository } from '../../../infra/db/mongodb/AccountRepository/AccountRepository';
import { IController } from '../../../presentation/interfaces';
import { LogControllerDecorator } from '../../decorators/LogControllerDecorator';
import { makeSignUpValidation } from './SignUpValidationFactory';

export const makeSignUpController = (): IController => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const addAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
  const signUpController = new SignUpController(
    addAccount,
    makeSignUpValidation(),
  );
  const logErrorMongoRepository = new LogErrorMongoRepository();

  return new LogControllerDecorator(signUpController, logErrorMongoRepository);
};
