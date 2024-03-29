import { makeLogControllerDecorator, makeDbLoadSurveys } from '@main/factories';
import { IController } from '@presentation/protocols';
import { LoadSurveysController } from '@presentation/controllers';

export const makeLoadSurveysController = (): IController => {
  const controller = new LoadSurveysController(makeDbLoadSurveys());
  return makeLogControllerDecorator(controller);
};
