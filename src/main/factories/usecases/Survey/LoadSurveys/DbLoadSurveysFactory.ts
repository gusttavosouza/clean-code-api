import { DbLoadSurveys } from '@data/usecases/Survey/LoadSurveys/DbLoadSurveys';
import { ILoadSurveys } from '@domain/usecases/Survey/LoadSurveys';
import { SurveyMongoRepository } from '@infra/db/mongodb/Survey/SurveyMongoRepository';

export const makeDbLoadSurveys = (): ILoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurveys(surveyMongoRepository);
};
