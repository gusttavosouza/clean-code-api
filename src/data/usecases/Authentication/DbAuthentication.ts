import {
  IAuthentication,
  IAuthenticationModel,
} from '../../../domain/usecases/IAuthentication';

import {
  ILoadAccountByEmailRepository,
  IUpdateAccessTokenRepository,
} from '../../interfaces/db';
import { IHashComparer, ITokenGenerator } from '../../interfaces/cryptography';

export class DbAuthentication implements IAuthentication {
  private readonly loadAccountByEmail: ILoadAccountByEmailRepository;
  private readonly hashCompare: IHashComparer;
  private readonly tokenGenerator: ITokenGenerator;
  private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository;

  constructor(
    loadAccountByEmail: ILoadAccountByEmailRepository,
    hashCompare: IHashComparer,
    tokenGenerator: ITokenGenerator,
    updateAccessTokenRepository: IUpdateAccessTokenRepository,
  ) {
    this.loadAccountByEmail = loadAccountByEmail;
    this.hashCompare = hashCompare;
    this.tokenGenerator = tokenGenerator;
    this.tokenGenerator = tokenGenerator;
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
        const accessToken = await this.tokenGenerator.generate(id);
        this.updateAccessTokenRepository.update(id, accessToken);
        return accessToken;
      }
    }
    return null;
  }
}
