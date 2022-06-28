import jwt from 'jsonwebtoken';
import { IEncrypter } from '@data/interfaces/cryptography';

export class JwtAdapter implements IEncrypter {
  private readonly secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  public async encrypt(value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret);
    return accessToken;
  }
}
