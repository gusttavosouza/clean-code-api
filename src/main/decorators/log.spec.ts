import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '../../presentation/interfaces';
import { LogControllerDecorator } from './log';

interface ISutTypes {
  sut: LogControllerDecorator;
  controllerStub: IController;
}

const makeController = (): IController => {
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
  return new ControllerStub();
};

const makeSut = (): ISutTypes => {
  const controllerStub = makeController();
  const sut = new LogControllerDecorator(controllerStub);
  return { controllerStub, sut };
};

describe('LogController Decorator', () => {
  const { controllerStub, sut } = makeSut();
  const handleSpy = jest.spyOn(controllerStub, 'handle');
  test('Should call controller handle', async () => {
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
