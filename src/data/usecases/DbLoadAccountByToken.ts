import { IDecrypter } from '@data/interfaces/cryptography';
import { ILoadAccountByTokenRepository } from '@data/interfaces/db';
import { AccountModel } from '@domain/models';
import { ILoadAccountByToken } from '@domain/usecases';

export class DbLoadAccountByToken implements ILoadAccountByToken {
  constructor(
    private readonly decrypter: IDecrypter,
    private readonly loadAccountByTokenRepository: ILoadAccountByTokenRepository,
  ) {
    this.decrypter = decrypter;
    this.loadAccountByTokenRepository = loadAccountByTokenRepository;
  }

  async load(accessToken: string, role?: string): Promise<AccountModel> {
    let token: string;

    try {
      token = await this.decrypter.decrypt(accessToken);
    } catch (err) {
      return null;
    }

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
