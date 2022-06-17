import { IAccountModel } from '../../../domain/models/Account';
import { IAuthenticationModel } from '../../../domain/usecases/IAuthentication';
import { IHashComparer } from '../../interfaces/cryptography/IHashComparer';
import { ITokenGenerator } from '../../interfaces/cryptography/ITokenGenerator';
import { ILoadAccountByEmailRepository } from '../../interfaces/db/ILoadAccountByEmailRepository';
import { DbAuthentication } from './DbAuthentication';

interface ISutTypes {
  sut: DbAuthentication;
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository;
  hashCompareStub: IHashComparer;
  tokenGeneratorStub: ITokenGenerator;
}

const makeFakeAccount = (): IAccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'hashed_password',
});

const makeFakeAuthentication = (): IAuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});

const makeLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
    implements ILoadAccountByEmailRepository
  {
    async load(_: string): Promise<IAccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()));
    }
  }
  return new LoadAccountByEmailRepositoryStub();
};

const makeHashComparer = (): IHashComparer => {
  class HashComparerStub implements IHashComparer {
    async compare(_: string, __: string): Promise<boolean> {
      return new Promise(resolve => resolve(true));
    }
  }
  return new HashComparerStub();
};

const makeTokenGenerator = (): ITokenGenerator => {
  class TokenGeneratorStub implements ITokenGenerator {
    async generate(_: string): Promise<string> {
      return new Promise(resolve => resolve('any_token'));
    }
  }
  return new TokenGeneratorStub();
};

const makeSut = (): ISutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
  const hashCompareStub = makeHashComparer();
  const tokenGeneratorStub = makeTokenGenerator();
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    tokenGeneratorStub,
  );

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    tokenGeneratorStub,
  };
};

describe('DBAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load');
    await sut.auth(makeFakeAuthentication());
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));

    const promise = sut.auth(makeFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });

  test('Should return null id LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockReturnValueOnce(null);
    const accessToken = await sut.auth(makeFakeAuthentication());
    expect(accessToken).toBeNull();
  });

  test('Should call HashComparer with correct values', async () => {
    const { sut, hashCompareStub } = makeSut();
    const compareSpy = jest.spyOn(hashCompareStub, 'compare');
    await sut.auth(makeFakeAuthentication());
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password');
  });

  test('Should throw if HashCompare throws', async () => {
    const { sut, hashCompareStub } = makeSut();
    jest
      .spyOn(hashCompareStub, 'compare')
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));

    const promise = sut.auth(makeFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });

  test('Should return null id HashCompare returns false', async () => {
    const { sut, hashCompareStub } = makeSut();
    jest
      .spyOn(hashCompareStub, 'compare')
      .mockReturnValueOnce(new Promise(resolve => resolve(false)));
    const accessToken = await sut.auth(makeFakeAuthentication());
    expect(accessToken).toBeNull();
  });

  test('Should call TokenGenerator with correct id', async () => {
    const { sut, tokenGeneratorStub } = makeSut();
    const generateSpy = jest.spyOn(tokenGeneratorStub, 'generate');
    await sut.auth(makeFakeAuthentication());
    expect(generateSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should throw if TokenGenerator throws', async () => {
    const { sut, tokenGeneratorStub } = makeSut();
    jest
      .spyOn(tokenGeneratorStub, 'generate')
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));

    const promise = sut.auth(makeFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });

  test('Should call TokenGenerator with correct id', async () => {
    const { sut } = makeSut();
    const accessToken = await sut.auth(makeFakeAuthentication());
    expect(accessToken).toBe('any_token');
  });
});
