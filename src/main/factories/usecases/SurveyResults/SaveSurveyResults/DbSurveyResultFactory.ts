import { DbSaveSurveyResult } from '@data/usecases/SurveyResult/SaveSurveyResult/DbSaveSurveyResult';
import { ISaveSurveyResult } from '@domain/usecases/SurveyResult/SaveSurveyResult';
import { SurveyResultMongoRepository } from '@infra/db/mongodb/SurveyResult/SurveyResultMongoRepository';

export const makeDbSaveSurveyResults = (): ISaveSurveyResult => {
  const surveyMongoRepository = new SurveyResultMongoRepository();
  return new DbSaveSurveyResult(surveyMongoRepository);
};
