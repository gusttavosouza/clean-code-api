import { SaveSurveyResultModel } from '@domain/usecases/SurveyResult/SaveSurveyResult';

export const mockSaveSurveyResultParams = (): SaveSurveyResultModel => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answers',
  date: new Date(),
});

export const mockSaveSurveyResultModel = (): SaveSurveyResultModel =>
  Object.assign(mockSaveSurveyResultParams(), {
    id: 'any_id',
  });
