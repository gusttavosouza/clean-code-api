import { IController } from '@presentation/interfaces';
import { makeLogControllerDecoratorFactory } from '@main/factories/decorators';
import { LoadSurveysController } from '@presentation/controllers/';
import { makeDbLoadSurveys } from '@main/factories/usecases';

export const makeLoadSurveysController = (): IController => {
  const loadSurveysController = new LoadSurveysController(makeDbLoadSurveys());
  return makeLogControllerDecoratorFactory(loadSurveysController);
};
