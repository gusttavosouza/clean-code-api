import { IDecrypter } from '@data/interfaces/cryptography/IDecrypter';
import { ILoadAccountByTokenRepository } from '@data/interfaces/db/Account/ILoadAccountByTokenRepository';
import { IAccountModel } from '../AddAccount/DbAddAccountProtocols';
import { DbLoadAccountByToken } from './DbLoadAccountByToken';

interface ISytTypes {
  decrypterStub: IDecrypter;
  sut: DbLoadAccountByToken;
  loadAccountTokenRepositoryStub: ILoadAccountByTokenRepository;
}

const makeFakeAccount = (): IAccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com@email.com',
  password: 'valid_password',
});

const makeDecrypter = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    async decrypt(_: string): Promise<string> {
      return new Promise(resolve => resolve('any_token'));
    }
  }
  return new DecrypterStub();
};

const makeLoadAccountTokenRepository = (): ILoadAccountByTokenRepository => {
  class LoadAccountTokenRepositoryStub
    implements ILoadAccountByTokenRepository
  {
    async loadByToken(_: string, __?: string): Promise<IAccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()));
    }
  }
  return new LoadAccountTokenRepositoryStub();
};

const makeSut = (): ISytTypes => {
  const decrypterStub = makeDecrypter();
  const loadAccountTokenRepositoryStub = makeLoadAccountTokenRepository();
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
      .mockReturnValueOnce(new Promise(resolve => resolve(null)));
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
      .mockReturnValueOnce(new Promise(resolve => resolve(null)));
    const account = await sut.load('any_token', 'any_role');
    expect(account).toBeNull();
  });

  test('Should return an account on success', async () => {
    const { sut } = makeSut();
    const account = await sut.load('any_token', 'any_role');
    expect(account).toEqual(makeFakeAccount());
  });
});
