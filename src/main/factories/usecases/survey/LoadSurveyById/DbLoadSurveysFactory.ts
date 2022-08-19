import { SurveyMongoRepository } from '@infra/db/mongodb/Survey/SurveyMongoRepository';
import { ILoadSurveyById } from '@domain/usecases/Survey/LoadSurveyById';
import { DbLoadSurveyById } from '@data/usecases/Survey/LoadSurveyById/DbLoadSurveyById';

export const makeDbLoadSurveyById = (): ILoadSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurveyById(surveyMongoRepository);
};
