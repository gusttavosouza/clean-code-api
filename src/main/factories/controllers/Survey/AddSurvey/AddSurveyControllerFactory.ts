import { IController } from '@presentation/interfaces';
import { makeLogControllerDecoratorFactory } from '@main/factories/decorators/LogControllerDecoratorFactory';
import { AddSurveyController } from '@presentation/controllers/Survey/AddSurvey/AddSurveyController';
import { makeDbAddSurvey } from '@main/factories/usecases/addSurvey/DbAddSurveyFactory';
import { makeAddSurveyValidation } from './AddSurveyValidationFactory';

export const makeAddSurveyController = (): IController => {
  const addSurveyController = new AddSurveyController(
    makeAddSurveyValidation(),
    makeDbAddSurvey(),
  );
  return makeLogControllerDecoratorFactory(addSurveyController);
};
