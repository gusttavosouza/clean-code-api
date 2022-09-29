import { IHasher } from '@data/interfaces/cryptography';
import {
  IAddAccountRepository,
  ILoadAccountByEmailRepository,
} from '@data/interfaces/db';
import { AccountModel } from '@domain/models/Account';
import {
  AddAccountParams,
  IAddAccount,
} from '@domain/usecases/Account/AddAccount';

export class DbAddAccount implements IAddAccount {
  constructor(
    private readonly hasher: IHasher,
    private readonly addAccountRepository: IAddAccountRepository,
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
  ) {
    this.hasher = hasher;
    this.addAccountRepository = addAccountRepository;
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
  }

  public async add(accountData: AddAccountParams): Promise<AccountModel> {
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
