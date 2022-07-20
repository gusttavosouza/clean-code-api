import { DbAddSurvey } from '@data/usecases/AddSurvey/DbAddSurvey';
import { IAddSurvey } from '@domain/usecases/AddSurvey';
import { SurveyMongoRepository } from '@infra/db/mongodb/Survey/SurveyMongoRepository';

export const makeDbAddSurvey = (): IAddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository();

  return new DbAddSurvey(surveyMongoRepository);
};
