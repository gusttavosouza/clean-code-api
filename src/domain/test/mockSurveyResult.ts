import { SurveyResultModel } from '@domain/models/SurveyResult';
import { SaveSurveyResultParams } from '@domain/usecases/SurveyResult/SaveSurveyResult';

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answers',
  date: new Date(),
});

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: 'any_survey_id',
  question: 'any_question',
  answers: [
    {
      answer: 'any_answer',
      count: 1,
      percent: 1,
    },
    {
      answer: 'other_answer',
      count: 10,
      percent: 10,
      image: 'other_image',
    },
  ],
  date: new Date(),
});
