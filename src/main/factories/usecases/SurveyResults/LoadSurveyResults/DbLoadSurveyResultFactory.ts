import { SurveyMongoRepository } from '@infra/db/mongodb/Survey/SurveyMongoRepository';
import { ILoadSurveyResult } from '@domain/usecases/SurveyResult/LoadSurveyResult';
import { SurveyResultMongoRepository } from '@infra/db/mongodb/SurveyResult/SurveyResultMongoRepository';
import { DbLoadSurveyResult } from '@data/usecases/SurveyResult/LoadSurveyResult/DbLoadSurveyResult';

export const makeDbLoadSurveyResult = (): ILoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository();
  const surveyMongoRepository = new SurveyMongoRepository();

  return new DbLoadSurveyResult(
    surveyResultMongoRepository,
    surveyMongoRepository,
  );
};
