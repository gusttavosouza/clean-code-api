import {
  IAccountModel,
  IAddAccount,
  IAddAccountModel,
  IEncrypter,
} from './DbAddAccountProtocols';

export default class DbAddAccount implements IAddAccount {
  private readonly encrypter: IEncrypter;

  constructor(encrypter: IEncrypter) {
    this.encrypter = encrypter;
  }

  public async add(account: IAddAccountModel): Promise<IAccountModel> {
    await this.encrypter.encrypt(account.password);
    return new Promise(resolve => resolve(null));
  }
}
