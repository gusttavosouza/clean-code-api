type SurveyAnswerAnswerModel = {
  image?: string;
  answer: string;
  count: number;
  percent: number;
};

export type SurveyResultModel = {
  surveyId: string;
  question: string;
  answers: SurveyAnswerAnswerModel[];
  date: Date;
};
