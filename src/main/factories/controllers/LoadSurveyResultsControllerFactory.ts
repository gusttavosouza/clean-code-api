import { IController } from '@presentation/interfaces';
import { makeLogControllerDecoratorFactory } from '@main/factories/decorators/LogControllerDecoratorFactory';
import { LoadSurveyResultController } from '@presentation/controllers/SurveyResult/LoadSurveyResult/LoadSurveyResultController';
import {
  makeDbLoadSurveyById,
  makeDbLoadSurveyResult,
} from '@main/factories/usecases';

export const makeLoadSurveyResultsController = (): IController => {
  const loadSurveyResultsController = new LoadSurveyResultController(
    makeDbLoadSurveyById(),
    makeDbLoadSurveyResult(),
  );
  return makeLogControllerDecoratorFactory(loadSurveyResultsController);
};
