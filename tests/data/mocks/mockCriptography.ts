import {
  IEncrypter,
  IHashComparer,
  IHasher,
  IDecrypter,
} from '@data/interfaces/cryptography';

export const mockHasher = (): IHasher => {
  class HasherStub implements IHasher {
    async hash(_: string): Promise<string> {
      return Promise.resolve('hashed_password');
    }
  }
  return new HasherStub();
};

export const mockDecrypter = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    async decrypt(_: string): Promise<string> {
      return Promise.resolve('any_token');
    }
  }
  return new DecrypterStub();
};

export const mockEncrypter = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    async encrypt(_: string): Promise<string> {
      return Promise.resolve('any_token');
    }
  }
  return new EncrypterStub();
};

export const mockHashComparer = (): IHashComparer => {
  class HashComparerStub implements IHashComparer {
    async compare(_: string, __: string): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new HashComparerStub();
};
