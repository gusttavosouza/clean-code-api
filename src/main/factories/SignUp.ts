import { BcryptAdapter } from '../../infra/criptography/BcryptAdapter';
import DbAddAccount from '../../data/usecases/AddAccount/DbAddAccount';
import SignUpController from '../../presentation/controllers/SignUp/SignUpController';
import EmailValidatorAdapter from '../../utils/EmailValidatorAdapter';
import { AccountMongoRepository } from '../../infra/db/mongodb/AccountRepository/AccountRepository';
import { IController } from '../../presentation/interfaces';
import { LogControllerDecorator } from '../decorators/log';

export const makeSignUpController = (): IController => {
  const salt = 12;
  const emailValidator = new EmailValidatorAdapter();
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const addAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
  const signUpController = new SignUpController(emailValidator, addAccount);
  return new LogControllerDecorator(signUpController);
};
