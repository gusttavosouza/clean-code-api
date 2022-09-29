import { IController } from '@presentation/interfaces';
import { makeLogControllerDecoratorFactory } from '@main/factories/decorators';
import { AddSurveyController } from '@presentation/controllers/Survey/AddSurvey/AddSurveyController';
import { makeDbAddSurvey } from '@main/factories/usecases';
import { makeAddSurveyValidation } from '../validation/AddSurveyValidationFactory';

export const makeAddSurveyController = (): IController => {
  const addSurveyController = new AddSurveyController(
    makeAddSurveyValidation(),
    makeDbAddSurvey(),
  );
  return makeLogControllerDecoratorFactory(addSurveyController);
};
