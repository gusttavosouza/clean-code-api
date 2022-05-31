import bcrypt from 'bcrypt';
import { BcryptAdapter } from './BcryptAdapter';

const salt = 12;

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise(resolve => resolve('hash'));
  },
}));

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });

  test('should return a hash on success', async () => {
    const sut = makeSut();
    const hash = await sut.encrypt('any_value');
    expect(hash).toBe('hash');
  });

  test('should throw if bcrypt throws', () => {
    const sut = makeSut();
    jest
      .spyOn(bcrypt, 'hash')
      .mockReturnValueOnce(
        new Promise((_, reject) => reject(new Error())) as any,
      );
    const promise = sut.encrypt('any_value');
    expect(promise).rejects.toThrow();
  });
});
