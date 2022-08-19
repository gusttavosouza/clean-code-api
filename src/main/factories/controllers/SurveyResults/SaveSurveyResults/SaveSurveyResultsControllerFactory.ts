import { IController } from '@presentation/interfaces';
import { makeLogControllerDecoratorFactory } from '@main/factories/decorators/LogControllerDecoratorFactory';
import { makeDbLoadSurveyById } from '@main/factories/usecases/Survey/LoadSurveyById/DbLoadSurveysFactory';
import { SaveSurveyResultController } from '@presentation/controllers/SurveyResult/SaveSurveyResult/SaveSurveyResultController';
import { makeDbSaveSurveyResults } from '@main/factories/usecases/SurveyResults/SaveSurveyResults/DbSurveyResultFactory';

export const makeSaveSurveyResultsController = (): IController => {
  const saveSurveyResultsController = new SaveSurveyResultController(
    makeDbLoadSurveyById(),
    makeDbSaveSurveyResults(),
  );
  return makeLogControllerDecoratorFactory(saveSurveyResultsController);
};
