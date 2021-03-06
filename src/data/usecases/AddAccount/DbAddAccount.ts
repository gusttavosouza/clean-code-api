import {
  IAccountModel,
  IAddAccount,
  IAddAccountModel,
  IAddAccountRepository,
  IHasher,
  ILoadAccountByEmailRepository,
} from './DbAddAccountProtocols';

export default class DbAddAccount implements IAddAccount {
  constructor(
    private readonly hasher: IHasher,
    private readonly addAccountRepository: IAddAccountRepository,
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
  ) {
    this.hasher = hasher;
    this.addAccountRepository = addAccountRepository;
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
  }

  public async add(accountData: IAddAccountModel): Promise<IAccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      accountData.email,
    );

    if (account) {
      return null;
    }

    const hashedPassword = await this.hasher.hash(accountData.password);
    const newAccount = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword,
    });
    return newAccount;
  }
}
