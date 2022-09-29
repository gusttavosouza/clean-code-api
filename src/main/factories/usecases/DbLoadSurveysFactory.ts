import { DbLoadSurveys } from '@data/usecases';
import { ILoadSurveys } from '@domain/usecases/LoadSurveys';
import { SurveyMongoRepository } from '@infra/db/mongodb';

export const makeDbLoadSurveys = (): ILoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurveys(surveyMongoRepository);
};
