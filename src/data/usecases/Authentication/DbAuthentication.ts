import { IHashComparer } from '../../interfaces/cryptography/IHashComparer';
import {
  IAuthentication,
  IAuthenticationModel,
} from '../../../domain/usecases/IAuthentication';
import { ILoadAccountByEmailRepository } from '../../interfaces/db/ILoadAccountByEmailRepository';

export class DbAuthentication implements IAuthentication {
  private readonly loadAccountByEmail: ILoadAccountByEmailRepository;
  private readonly hashCompare: IHashComparer;

  constructor(
    loadAccountByEmail: ILoadAccountByEmailRepository,
    hashCompare: IHashComparer,
  ) {
    this.loadAccountByEmail = loadAccountByEmail;
    this.hashCompare = hashCompare;
  }

  public async auth(authentication: IAuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmail.load(authentication.email);

    if (!account) {
      await this.hashCompare.compare(authentication.password, account.password);
    }
    return null;
  }
}
