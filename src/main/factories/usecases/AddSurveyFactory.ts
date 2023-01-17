import { IAddSurvey } from '@domain/usecases';
import { SurveyMongoRepository } from '@infra/db';
import { DbAddSurvey } from '@data/usecases';

export const makeDbAddSurvey = (): IAddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbAddSurvey(surveyMongoRepository);
};
