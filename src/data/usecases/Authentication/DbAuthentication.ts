import { IHashComparer } from '../../interfaces/cryptography/IHashComparer';
import {
  IAuthentication,
  IAuthenticationModel,
} from '../../../domain/usecases/IAuthentication';
import { ILoadAccountByEmailRepository } from '../../interfaces/db/ILoadAccountByEmailRepository';
import { ITokenGenerator } from '../../interfaces/cryptography/ITokenGenerator';

export class DbAuthentication implements IAuthentication {
  private readonly loadAccountByEmail: ILoadAccountByEmailRepository;
  private readonly hashCompare: IHashComparer;
  private readonly tokenGenerator: ITokenGenerator;

  constructor(
    loadAccountByEmail: ILoadAccountByEmailRepository,
    hashCompare: IHashComparer,
    tokenGenerator: ITokenGenerator,
  ) {
    this.loadAccountByEmail = loadAccountByEmail;
    this.hashCompare = hashCompare;
    this.tokenGenerator = tokenGenerator;
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
        return accessToken;
      }
    }
    return null;
  }
}
