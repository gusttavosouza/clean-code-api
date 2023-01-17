import { SurveyMongoRepository } from '@infra/db';
import { ILoadSurveys } from '@domain/usecases';
import { DbLoadSurveys } from '@data/usecases';

export const makeDbLoadSurveys = (): ILoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurveys(surveyMongoRepository);
};
