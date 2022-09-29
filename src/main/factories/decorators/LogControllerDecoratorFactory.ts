import { LogErrorMongoRepository } from '@infra/db/mongodb';
import { LogControllerDecorator } from '@main/decorators';
import { IController } from '@presentation/interfaces';

export const makeLogControllerDecoratorFactory = (
  controller: IController,
): IController => {
  const logErrorMongoRepository = new LogErrorMongoRepository();
  return new LogControllerDecorator(controller, logErrorMongoRepository);
};
