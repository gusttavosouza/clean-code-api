import { MissingParamError } from '../../errors';
import { BadRequest } from '../../helpers';
import { LoginController } from './LoginController';

interface ISutTypes {
  sut: LoginController;
}

const makeSut = (): ISutTypes => {
  const sut = new LoginController();
  return {
    sut,
  };
};

describe('', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: 'any_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(BadRequest(new MissingParamError('email')));
  });

  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'mail@email.com',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(BadRequest(new MissingParamError('password')));
  });
});
