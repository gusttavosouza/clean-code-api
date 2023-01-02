import { IDecrypter } from '@data/interfaces/cryptography';
import { ILoadAccountByTokenRepository } from '@data/interfaces/db';
import { DbLoadAccountByToken } from '@data/usecases';
import { mockAccountModel, ThrowError } from '@tests/domain/mocks';
import { mockDecrypter, mockLoadAccountByToken } from '@tests/data/mocks';

type SutTypes = {
  decrypterStub: IDecrypter;
  sut: DbLoadAccountByToken;
  loadAccountTokenRepositoryStub: ILoadAccountByTokenRepository;
};

const makeSut = (): SutTypes => {
  const decrypterStub = mockDecrypter();
  const loadAccountTokenRepositoryStub = mockLoadAccountByToken();
  const sut = new DbLoadAccountByToken(
    decrypterStub,
    loadAccountTokenRepositoryStub,
  );
  return {
    sut,
    decrypterStub,
    loadAccountTokenRepositoryStub,
  };
};

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut();
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt');
    await sut.load('any_token', 'any_role');
    expect(decryptSpy).toHaveBeenCalledWith('any_token');
  });

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut();
    jest
      .spyOn(decrypterStub, 'decrypt')
      .mockReturnValueOnce(Promise.resolve(null));
    const account = await sut.load('any_token');
    expect(account).toBeNull();
  });

  test('Should call LoadAccountTokenRepository with correct values', async () => {
    const { sut, loadAccountTokenRepositoryStub } = makeSut();
    const loadByTokenSpy = jest.spyOn(
      loadAccountTokenRepositoryStub,
      'loadByToken',
    );
    await sut.load('any_token', 'any_role');
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role');
  });

  test('Should return null if LoadAccountTokenRepository returns null', async () => {
    const { sut, loadAccountTokenRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountTokenRepositoryStub, 'loadByToken')
      .mockReturnValueOnce(Promise.resolve(null));
    const account = await sut.load('any_token', 'any_role');
    expect(account).toBeNull();
  });

  test('Should return an account on success', async () => {
    const { sut } = makeSut();
    const account = await sut.load('any_token', 'any_role');
    expect(account).toEqual(mockAccountModel());
  });

  test('should throw if Decrypter throws', async () => {
    const { decrypterStub, sut } = makeSut();
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(ThrowError);
    const account = await sut.load('any_token', 'any_role');
    await expect(account).toBeNull();
  });

  test('should throw if Decrypter throws', async () => {
    const { loadAccountTokenRepositoryStub, sut } = makeSut();
    jest
      .spyOn(loadAccountTokenRepositoryStub, 'loadByToken')
      .mockImplementationOnce(ThrowError);
    const promise = sut.load('any_token', 'any_role');
    await expect(promise).rejects.toThrow();
  });
});