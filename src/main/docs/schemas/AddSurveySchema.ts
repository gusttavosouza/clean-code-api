export const AddSurveySchema = {
  type: 'object',
  properties: {
    question: {
      type: 'string',
    },
    answer: {
      type: 'array',
      items: {
        $ref: '#/schemas/SurveyAnswerSchema',
      },
    },
  },
};
