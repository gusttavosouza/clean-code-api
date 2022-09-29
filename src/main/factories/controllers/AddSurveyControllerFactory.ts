import { IController } from '@presentation/interfaces';
import { makeLogControllerDecoratorFactory } from '@main/factories/decorators';
import { AddSurveyController } from '@presentation/controllers';
import { makeDbAddSurvey } from '@main/factories/usecases';
import { makeAddSurveyValidation } from '@main/factories/validation';

export const makeAddSurveyController = (): IController => {
  const addSurveyController = new AddSurveyController(
    makeAddSurveyValidation(),
    makeDbAddSurvey(),
  );
  return makeLogControllerDecoratorFactory(addSurveyController);
};
