import {
  IAuthentication,
  IAuthenticationModel,
} from '../../../domain/usecases/IAuthentication';
import { ILoadAccountByEmailRepository } from '../../interfaces/db/ILoadAccountByEmailRepository';

export class DbAuthentication implements IAuthentication {
  private readonly loadAccountByEmail: ILoadAccountByEmailRepository;

  constructor(loadAccountByEmail: ILoadAccountByEmailRepository) {
    this.loadAccountByEmail = loadAccountByEmail;
  }

  public async auth(authentication: IAuthenticationModel): Promise<string> {
    await this.loadAccountByEmail.load(authentication.email);
    return null;
  }
}
