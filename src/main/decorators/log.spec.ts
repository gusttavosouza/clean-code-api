import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '../../presentation/interfaces';
import { LogControllerDecorator } from './log';

describe('LogController Decorator', () => {
  class ControllerStub implements IController {
    async handle(_: IHttpRequest): Promise<IHttpResponse> {
      const httpResponse: IHttpResponse = {
        body: {
          email: 'any_email',
          name: 'any_name',
          password: 'any_password',
          passwordConfirmation: 'any_password',
        },
        statusCode: 200,
      };
      return new Promise(resolve => resolve(httpResponse));
    }
  }

  const controllerStub = new ControllerStub();
  const handleSpy = jest.spyOn(controllerStub, 'handle');
  test('Should call controller handle', async () => {
    const sut = new LogControllerDecorator(controllerStub);
    const httpRequest = {
      body: {
        email: 'any_email',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    await sut.handle(httpRequest);

    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });
});
