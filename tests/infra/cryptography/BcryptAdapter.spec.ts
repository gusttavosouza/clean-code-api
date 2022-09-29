import bcrypt from 'bcrypt';
import { BcryptAdapter } from '@infra/criptography';
import { ThrowError } from '@tests/domain/mocks';

const salt = 12;

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve('hash');
  },
  async compare(): Promise<boolean> {
    return Promise.resolve(true);
  },
}));

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    test('should call hash with correct values', async () => {
      const sut = makeSut();
      const hashSpy = jest.spyOn(bcrypt, 'hash');
      await sut.hash('any_value');
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
    });

    test('should return a valid hash on hash success', async () => {
      const sut = makeSut();
      const hash = await sut.hash('any_value');
      expect(hash).toBe('hash');
    });

    test('should throw if hash throws', () => {
      const sut = makeSut();
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(ThrowError);
      const promise = sut.hash('any_value');
      expect(promise).rejects.toThrow();
    });
  });

  describe('compare()', () => {
    test('should call compare with correct values', async () => {
      const sut = makeSut();
      const compareSpy = jest.spyOn(bcrypt, 'compare');
      await sut.compare('any_value', 'any_hash');
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash');
    });

    test('should return true an compare succeeds', async () => {
      const sut = makeSut();
      const isValid = await sut.compare('any_value', 'any_hash');
      expect(isValid).toBe(true);
    });

    test('should return false when compare fails', async () => {
      const sut = makeSut();
      jest
        .spyOn(bcrypt, 'compare')
        .mockReturnValueOnce(Promise.resolve(false) as any);

      const isValid = await sut.compare('any_value', 'any_hash');
      expect(isValid).toBe(false);
    });

    test('should throw if compare throws', () => {
      const sut = makeSut();
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(ThrowError);
      const promise = sut.compare('any_value', 'any_hash');
      expect(promise).rejects.toThrow();
    });
  });
});
