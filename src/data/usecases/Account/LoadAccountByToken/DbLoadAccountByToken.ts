import {
  IDecrypter,
  ILoadAccountByTokenRepository,
  ILoadAccountByToken,
  AccountModel,
} from './DbLoadAccountByTokenProtocols';

export class DbLoadAccountByToken implements ILoadAccountByToken {
  constructor(
    private readonly decrypter: IDecrypter,
    private readonly loadAccountByTokenRepository: ILoadAccountByTokenRepository,
  ) {
    this.decrypter = decrypter;
    this.loadAccountByTokenRepository = loadAccountByTokenRepository;
  }

  async load(accessToken: string, role?: string): Promise<AccountModel> {
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
