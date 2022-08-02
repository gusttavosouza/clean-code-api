import { IDecrypter } from '@data/interfaces/cryptography/IDecrypter';
import { ILoadAccountByTokenRepository } from '@data/interfaces/db/Account/ILoadAccountByTokenRepository';
import { ILoadAccountByToken } from '@domain/usecases/LoadAccountByToken';
import { IAccountModel } from '../AddAccount/DbAddAccountProtocols';

export class DbLoadAccountByToken implements ILoadAccountByToken {
  constructor(
    private readonly decrypter: IDecrypter,
    private readonly loadAccountByTokenRepository: ILoadAccountByTokenRepository,
  ) {
    this.decrypter = decrypter;
    this.loadAccountByTokenRepository = loadAccountByTokenRepository;
  }

  async load(accessToken: string, role?: string): Promise<IAccountModel> {
    const token = await this.decrypter.decrypt(accessToken);
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(
        accessToken,
        role,
      );
      if (account) {
        return account;
      }
    }
    return null;
  }
}
