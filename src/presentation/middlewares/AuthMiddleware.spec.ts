import { AccessDeniedError } from '@presentation/errors';
import { Forbidden } from '@presentation/helpers/http';
import { AuthMiddleware } from './AuthMiddleware';

describe('Auth Middleware', () => {
  it('Should return 403 if no x-access-token exists in headers', async () => {
    const sut = new AuthMiddleware();

    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(Forbidden(new AccessDeniedError()));
  });
});
