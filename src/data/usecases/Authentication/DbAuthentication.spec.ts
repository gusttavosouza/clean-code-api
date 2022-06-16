import { IAccountModel } from '../../../domain/models/Account';
import { ILoadAccountByEmailRepository } from '../../interfaces/ILoadAccountByEmailRepository';
import { DbAuthentication } from './DbAuthentication';

const makeLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
    implements ILoadAccountByEmailRepository
  {
    async load(_: string): Promise<IAccountModel> {
      const account: IAccountModel = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
      };
      return new Promise(resolve => resolve(account));
    }
  }
  return new LoadAccountByEmailRepositoryStub();
};

describe('DBAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
    const sut = new DbAuthentication(loadAccountByEmailRepositoryStub);
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load');
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com');
  });
});
