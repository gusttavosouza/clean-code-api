import { LogErrorMongoRepository } from '@infra/db/mongodb/LogError/LogErrorMongoRepository';
import { LogControllerDecorator } from '@main/decorators/LogControllerDecorator';
import { IController } from '@presentation/interfaces';

export const makeLogControllerDecoratorFactory = (
  controller: IController,
): IController => {
  const logErrorMongoRepository = new LogErrorMongoRepository();
  return new LogControllerDecorator(controller, logErrorMongoRepository);
};
