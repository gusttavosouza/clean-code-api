import { ILoadAccountByEmailRepository } from '../../interfaces/ILoadAccountByEmailRepository';
import {
  IAuthentication,
  IAuthenticationModel,
} from '../../../domain/usecases/IAuthentication';

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
