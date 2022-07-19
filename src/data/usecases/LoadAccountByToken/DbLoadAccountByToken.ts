import { IDecrypter } from '@data/interfaces/cryptography/IDecrypter';
import { ILoadAccountByToken } from '@domain/usecases/ILoadAccountByToken';
import { IAccountModel } from '../AddAccount/DbAddAccountProtocols';

export class DbLoadAccountByToken implements ILoadAccountByToken {
  constructor(private readonly decrypter: IDecrypter) {
    this.decrypter = decrypter;
  }

  async load(accessToken: string, role?: string): Promise<IAccountModel> {
    await this.decrypter.decrypt(accessToken);
    return null;
  }
}
