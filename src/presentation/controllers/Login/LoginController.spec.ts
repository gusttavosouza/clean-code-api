import { MissingParamError } from '../../errors';
import { BadRequest } from '../../helpers';
import { LoginController } from './LoginController';

describe('', () => {
  test('Should return 400 if no email is provided', async () => {
    const sut = new LoginController();
    const httpRequest = {
      body: {
        password: 'any_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(BadRequest(new MissingParamError('email')));
  });

  test('Should return 400 if no email is provided', async () => {
    const sut = new LoginController();
    const httpRequest = {
      body: {
        email: 'mail@email.com',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(BadRequest(new MissingParamError('password')));
  });
});
