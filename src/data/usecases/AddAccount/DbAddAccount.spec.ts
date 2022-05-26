import { IEncrypter } from '../../interfaces/Encrypter';
import DbAddAccount from './DbAddAccount';

interface ISutTypes {
  sut: DbAddAccount;
  encrypterStub: IEncrypter;
}

const makeEncrypter = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    async encrypt(_: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'));
    }
  }

  return new EncrypterStub();
};

const makeSut = (): ISutTypes => {
  const encrypterStub = makeEncrypter();
  const sut = new DbAddAccount(encrypterStub);
  return {
    sut,
    encrypterStub,
  };
};

describe('DbAddAccount Usecase', () => {
  test('should call Encrypter with correct password', async () => {
    const { encrypterStub, sut } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    };
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });

  test('should throw if Encrypter throws', async () => {
    const { encrypterStub, sut } = makeSut();
    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    };
    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow();
  });
});
