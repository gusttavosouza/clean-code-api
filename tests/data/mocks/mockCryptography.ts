import faker from 'faker';
import {
  IHasher,
  IHashComparer,
  IEncrypter,
  IDecrypter,
} from '@data/protocols';

export class HasherSpy implements IHasher {
  digest = faker.random.uuid();
  plaintext: string;

  async hash(plaintext: string): Promise<string> {
    this.plaintext = plaintext;
    return this.digest;
  }
}

export class HashComparerSpy implements IHashComparer {
  plaintext: string;
  digest: string;
  isValid = true;

  async compare(plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext;
    this.digest = digest;
    return this.isValid;
  }
}

export class EncrypterSpy implements IEncrypter {
  ciphertext = faker.random.uuid();
  plaintext: string;

  async encrypt(plaintext: string): Promise<string> {
    this.plaintext = plaintext;
    return this.ciphertext;
  }
}

export class DecrypterSpy implements IDecrypter {
  plaintext = faker.internet.password();
  ciphertext: string;

  async decrypt(ciphertext: string): Promise<string> {
    this.ciphertext = ciphertext;
    return this.plaintext;
  }
}
