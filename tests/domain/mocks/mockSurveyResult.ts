import { SurveyResultModel } from '@domain/models/SurveyResult';
import { ISaveSurveyResult } from '@domain/usecases';

export const mockSaveSurveyResultParams = (): ISaveSurveyResult.Params => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answers',
  date: new Date(),
});

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: 'any_id',
  question: 'any_question',
  answers: [
    {
      answer: 'any_answer',
      count: 0,
      percent: 0,
      isCurrentAccountAnswer: false,
    },
    {
      answer: 'other_answer',
      count: 0,
      percent: 0,
      image: 'any_image',
      isCurrentAccountAnswer: false,
    },
  ],
  date: new Date(),
});
