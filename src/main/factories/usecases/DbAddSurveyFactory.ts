import { DbAddSurvey } from '@data/usecases';
import { IAddSurvey } from '@domain/usecases/AddSurvey';
import { SurveyMongoRepository } from '@infra/db/mongodb';

export const makeDbAddSurvey = (): IAddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository();

  return new DbAddSurvey(surveyMongoRepository);
};
