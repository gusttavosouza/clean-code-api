import jwt from 'jsonwebtoken';
import { IEncrypter } from '@data/interfaces/cryptography';
import { IDecrypter } from '@data/interfaces/cryptography/IDecrypter';

export class JwtAdapter implements IEncrypter, IDecrypter {
  private readonly secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  public async decrypt(value: string): Promise<string> {
    await jwt.verify(value, this.secret);
    return new Promise(resolve => resolve(null));
  }

  public async encrypt(value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret);
    return accessToken;
  }
}
