import { ILogErrorRepository } from '@data/interfaces/db/ILogErrorRepository';
import { Success, InternalError } from '@presentation/helpers/http';
import { IController, IHttpResponse } from '@presentation/interfaces';
import { mockAccountModel } from '@tests/domain/mocks';
import { mockLogErrorRepository } from '@tests/data/mocks';
import { LogControllerDecorator } from '@main/decorators';

type SutTypes = {
  sut: LogControllerDecorator;
  controllerStub: IController;
  logErrorRepositoryStub: ILogErrorRepository;
};

const makeController = (): IController => {
  class ControllerStub implements IController {
    async handle(_: any): Promise<IHttpResponse> {
      return Promise.resolve(Success(mockAccountModel()));
    }
  }
  return new ControllerStub();
};

const mockError = (): IHttpResponse => {
  const fakeError = new Error();
  fakeError.stack = 'any_stack';
  return InternalError(fakeError);
};

const makeSut = (): SutTypes => {
  const controllerStub = makeController();
  const logErrorRepositoryStub = mockLogErrorRepository();
  const sut = new LogControllerDecorator(
    controllerStub,
    logErrorRepositoryStub,
  );
  return { controllerStub, sut, logErrorRepositoryStub };
};

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { controllerStub, sut } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, 'handle');

    await sut.handle('any_request');

    expect(handleSpy).toHaveBeenCalledWith('any_request');
  });

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle('any_request');

    expect(httpResponse).toEqual(Success(mockAccountModel()));
  });

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut();
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError');

    jest
      .spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(Promise.resolve(mockError()));

    await sut.handle('any_request');

    expect(logSpy).toHaveBeenCalledWith('any_stack');
  });
});
