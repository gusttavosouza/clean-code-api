import { DbSaveSurveyResult } from '@data/usecases';
import { ISaveSurveyResult } from '@domain/usecases';
import { SurveyResultMongoRepository } from '@infra/db/mongodb';

export const makeDbSaveSurveyResults = (): ISaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository();
  return new DbSaveSurveyResult(
    surveyResultMongoRepository,
    surveyResultMongoRepository,
  );
};
