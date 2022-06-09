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
          name: 'any_name',
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
  test('Should call controller handle', async () => {
    const { controllerStub, sut } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, 'handle');
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

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual({
      body: {
        name: 'any_name',
      },
      statusCode: 200,
    });
  });
});
