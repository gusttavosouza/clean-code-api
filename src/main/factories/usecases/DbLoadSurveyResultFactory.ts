import {
  SurveyMongoRepository,
  SurveyResultMongoRepository,
} from '@infra/db/mongodb';
import { ILoadSurveyResult } from '@domain/usecases';
import { DbLoadSurveyResult } from '@data/usecases';

export const makeDbLoadSurveyResult = (): ILoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository();
  const surveyMongoRepository = new SurveyMongoRepository();

  return new DbLoadSurveyResult(
    surveyResultMongoRepository,
    surveyMongoRepository,
  );
};
