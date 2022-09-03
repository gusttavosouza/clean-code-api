export const SurveysSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/SurveySchema',
  },
};
