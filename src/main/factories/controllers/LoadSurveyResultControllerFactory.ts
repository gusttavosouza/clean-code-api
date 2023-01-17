import {
  makeLogControllerDecorator,
  makeDbCheckSurveyById,
  makeDbLoadSurveyResult,
} from '@main/factories';
import { IController } from '@presentation/protocols';
import { LoadSurveyResultController } from '@presentation/controllers';

export const makeLoadSurveyResultController = (): IController => {
  const controller = new LoadSurveyResultController(
    makeDbCheckSurveyById(),
    makeDbLoadSurveyResult(),
  );
  return makeLogControllerDecorator(controller);
};
