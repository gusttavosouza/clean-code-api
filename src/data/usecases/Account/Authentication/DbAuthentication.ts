import {
  ILoadAccountByEmailRepository,
  IUpdateAccessTokenRepository,
  IHashComparer,
  IEncrypter,
  AuthenticationModel,
  IAuthentication,
} from './DBAuthenticationProtocols';

export class DbAuthentication implements IAuthentication {
  constructor(
    private readonly loadAccountByEmail: ILoadAccountByEmailRepository,
    private readonly hashCompare: IHashComparer,
    private readonly encrypter: IEncrypter,
    private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository,
  ) {
    this.loadAccountByEmail = loadAccountByEmail;
    this.hashCompare = hashCompare;
    this.encrypter = encrypter;
    this.encrypter = encrypter;
    this.updateAccessTokenRepository = updateAccessTokenRepository;
  }

  public async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmail.loadByEmail(
      authentication.email,
    );

    if (account) {
      const { id, password } = account;
      const isValid = await this.hashCompare.compare(
        authentication.password,
        password,
      );
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(id);
        this.updateAccessTokenRepository.updateAccessToken(id, accessToken);
        return accessToken;
      }
    }
    return null;
  }
}
