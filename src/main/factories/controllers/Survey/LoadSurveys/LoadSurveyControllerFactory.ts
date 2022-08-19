import { IController } from '@presentation/interfaces';
import { makeLogControllerDecoratorFactory } from '@main/factories/decorators/LogControllerDecoratorFactory';
import { LoadSurveysController } from '@presentation/controllers/Survey/LoadSurvey/LoadSurveysController';
import { makeDbLoadSurveys } from '@main/factories/usecases/Survey/LoadSurveys/DbLoadSurveysFactory';

export const makeLoadSurveysController = (): IController => {
  const loadSurveysController = new LoadSurveysController(makeDbLoadSurveys());
  return makeLogControllerDecoratorFactory(loadSurveysController);
};
