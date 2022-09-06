export const SurveyResultSchema = {
  type: 'object',
  properties: {
    surveyId: {
      type: 'string',
    },
    question: {
      type: 'string',
    },
    answers: {
      type: 'array',
      items: {
        $ref: '#/schemas/SurveyResultAnswerSchema',
      },
    },
    date: {
      type: 'string',
    },
  },
  required: ['surveyId', 'question', 'answers', 'date'],
};
