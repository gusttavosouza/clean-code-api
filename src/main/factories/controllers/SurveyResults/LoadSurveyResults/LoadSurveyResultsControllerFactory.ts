import { IController } from '@presentation/interfaces';
import { makeLogControllerDecoratorFactory } from '@main/factories/decorators/LogControllerDecoratorFactory';
import { makeDbLoadSurveyById } from '@main/factories/usecases/Survey/LoadSurveyById/DbLoadSurveyByIdFactory';
import { LoadSurveyResultController } from '@presentation/controllers/SurveyResult/LoadSurveyResult/LoadSurveyResultController';
import { makeDbLoadSurveyResult } from '@main/factories/usecases/SurveyResults/LoadSurveyResults/DbLoadSurveyResultFactory';

export const makeLoadSurveyResultsController = (): IController => {
  const loadSurveyResultsController = new LoadSurveyResultController(
    makeDbLoadSurveyById(),
    makeDbLoadSurveyResult(),
  );
  return makeLogControllerDecoratorFactory(loadSurveyResultsController);
};
