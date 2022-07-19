import { IAccountModel } from '@domain/models/Account';
import { ILoadAccountByToken } from '@domain/usecases/ILoadAccountByToken';
import { AccessDeniedError } from '@presentation/errors';
import { Forbidden } from '@presentation/helpers/http';
import { AuthMiddleware } from './AuthMiddleware';

interface ISytTypes {
  sut: AuthMiddleware;
  loadAccountByTokenStub: ILoadAccountByToken;
}

const makeFakeAccount = (): IAccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com@email.com',
  password: 'valid_password',
});

const makeFakeLoadAccountByToken = (): ILoadAccountByToken => {
  class LoadAccountByTokenStub implements ILoadAccountByToken {
    async load(_: string, __?: string): Promise<IAccountModel> {
      const account = makeFakeAccount();
      return new Promise(resolve => resolve(account));
    }
  }
  return new LoadAccountByTokenStub();
};

const makeSut = (): ISytTypes => {
  const loadAccountByTokenStub = makeFakeLoadAccountByToken();
  const sut = new AuthMiddleware(loadAccountByTokenStub);
  return {
    sut,
    loadAccountByTokenStub,
  };
};

describe('Auth Middleware', () => {
  it('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(Forbidden(new AccessDeniedError()));
  });

  it('Should call LoadAccountByToken with correct accessToken', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load');
    await sut.handle({
      headers: {
        'x-access-token': 'any_token',
      },
    });
    expect(loadSpy).toHaveBeenCalledWith('any_token');
  });
});
