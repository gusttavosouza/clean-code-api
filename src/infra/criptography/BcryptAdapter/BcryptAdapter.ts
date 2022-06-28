import bcrypt from 'bcrypt';
import { IHashComparer } from '../../../data/interfaces/cryptography/IHashComparer';
import { IHasher } from '../../../data/interfaces/cryptography/IHasher';

export class BcryptAdapter implements IHasher, IHashComparer {
  constructor(private readonly salt: number) {
    this.salt = salt;
  }

  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt);
    return hash;
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash);
    return isValid;
  }
}
