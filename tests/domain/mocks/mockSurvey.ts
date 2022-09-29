import { SurveyModel } from '@domain/models/Survey';
import { AddSurveyParams } from '@domain/usecases/Survey/AddSurvey';
import { SurveyResultModel } from '@domain/models/SurveyResult';

export const mockSurvey = (): SurveyModel => {
  return {
    id: 'any_id',
    question: 'any_question',
    answers: [
      {
        answer: 'any_answer',
      },
      {
        answer: 'other_answer',
        image: 'any_image',
      },
    ],
    date: new Date(),
  };
};

export const mockSurveyResult = (): SurveyResultModel => ({
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

export const mockSurveys = (): SurveyModel[] => {
  return [
    {
      id: 'any_id',
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer',
        },
      ],
      date: new Date(),
    },
    {
      id: 'other_id',
      question: 'other_question',
      answers: [
        {
          image: 'other_image',
          answer: 'other_answer',
        },
      ],
      date: new Date(),
    },
  ];
};

export const mockAddSurveyParams = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer',
    },
  ],
  date: new Date(),
});
