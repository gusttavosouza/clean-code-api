export const SurveySchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    question: {
      type: 'string',
    },
    answer: {
      type: 'array',
      items: {
        $ref: '#/schemas/SurveyAnswerSchema',
      },
    },
    date: {
      type: 'string',
    },
  },
  required: ['id', 'question', 'answers', 'date'],
};
