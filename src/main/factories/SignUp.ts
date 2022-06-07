import { BcryptAdapter } from '../../infra/criptography/BcryptAdapter';
import DbAddAccount from '../../data/usecases/AddAccount/DbAddAccount';
import SignUpController from '../../presentation/controllers/SignUp/SignUpController';
import EmailValidatorAdapter from '../../utils/EmailValidatorAdapter';
import { AccountMongoRepository } from '../../infra/db/mongodb/AccountRepository/AccountRepository';

export const makeSignUpController = (): SignUpController => {
  const salt = 12;
  const emailValidator = new EmailValidatorAdapter();
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const addAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
  return new SignUpController(emailValidator, addAccount);
};
