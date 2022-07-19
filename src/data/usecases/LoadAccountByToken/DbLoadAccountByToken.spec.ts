import { IDecrypter } from '@data/interfaces/cryptography/IDecrypter';
import { DbLoadAccountByToken } from './DbLoadAccountByToken';

interface ISytTypes {
  decrypterStub: IDecrypter;
  sut: DbLoadAccountByToken;
}

const makeDecrypter = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    async decrypt(_: string): Promise<string> {
      return new Promise(resolve => resolve('any_value'));
    }
  }
  return new DecrypterStub();
};

const makeSut = (): ISytTypes => {
  const decrypterStub = makeDecrypter();
  const sut = new DbLoadAccountByToken(decrypterStub);
  return { sut, decrypterStub };
};

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut();
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt');
    await sut.load('any_token');
    expect(decryptSpy).toHaveBeenCalledWith('any_token');
  });
});
