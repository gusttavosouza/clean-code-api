import {
  ILoadAccountByEmailRepository,
  IUpdateAccessTokenRepository,
  IHashComparer,
  IEncrypter,
  IAuthenticationModel,
  IAuthentication,
} from './DBAuthenticationProtocols';

export class DbAuthentication implements IAuthentication {
  private readonly loadAccountByEmail: ILoadAccountByEmailRepository;
  private readonly hashCompare: IHashComparer;
  private readonly encrypter: IEncrypter;
  private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository;

  constructor(
    loadAccountByEmail: ILoadAccountByEmailRepository,
    hashCompare: IHashComparer,
    encrypter: IEncrypter,
    updateAccessTokenRepository: IUpdateAccessTokenRepository,
  ) {
    this.loadAccountByEmail = loadAccountByEmail;
    this.hashCompare = hashCompare;
    this.encrypter = encrypter;
    this.encrypter = encrypter;
    this.updateAccessTokenRepository = updateAccessTokenRepository;
  }

  public async auth(authentication: IAuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmail.load(authentication.email);

    if (account) {
      const { id, password } = account;
      const isValid = await this.hashCompare.compare(
        authentication.password,
        password,
      );
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(id);
        this.updateAccessTokenRepository.update(id, accessToken);
        return accessToken;
      }
    }
    return null;
  }
}
