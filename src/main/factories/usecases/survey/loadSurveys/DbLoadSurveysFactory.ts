import { DbLoadSurveys } from '@data/usecases/LoadSurveys/DbLoadSurveys';
import { ILoadSurveys } from '@domain/usecases/LoadSurveys';
import { SurveyMongoRepository } from '@infra/db/mongodb/Survey/SurveyMongoRepository';

export const makeDbLoadSurveys = (): ILoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurveys(surveyMongoRepository);
};
