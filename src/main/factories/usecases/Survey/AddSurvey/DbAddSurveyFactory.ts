import { DbAddSurvey } from '@data/usecases/Survey/AddSurvey/DbAddSurvey';
import { IAddSurvey } from '@domain/usecases/Survey/AddSurvey';
import { SurveyMongoRepository } from '@infra/db/mongodb/Survey/SurveyMongoRepository';

export const makeDbAddSurvey = (): IAddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository();

  return new DbAddSurvey(surveyMongoRepository);
};
