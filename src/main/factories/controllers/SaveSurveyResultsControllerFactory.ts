import { IController } from '@presentation/interfaces';
import { SaveSurveyResultController } from '@presentation/controllers';
import { makeLogControllerDecoratorFactory } from '@main/factories/decorators';
import {
  makeDbSaveSurveyResults,
  makeDbLoadSurveyById,
} from '@main/factories/usecases';

export const makeSaveSurveyResultsController = (): IController => {
  const saveSurveyResultsController = new SaveSurveyResultController(
    makeDbLoadSurveyById(),
    makeDbSaveSurveyResults(),
  );
  return makeLogControllerDecoratorFactory(saveSurveyResultsController);
};
