import {
  IAccountModel,
  IAddAccount,
  IAddAccountModel,
  IAddAccountRepository,
  IHasher,
} from './DbAddAccountProtocols';

export default class DbAddAccount implements IAddAccount {
  private readonly hasher: IHasher;
  private readonly addAccountRepository: IAddAccountRepository;

  constructor(hasher: IHasher, addAccountRepository: IAddAccountRepository) {
    this.hasher = hasher;
    this.addAccountRepository = addAccountRepository;
  }

  public async add(accountData: IAddAccountModel): Promise<IAccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password);
    const account = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword,
    });
    return account;
  }
}
