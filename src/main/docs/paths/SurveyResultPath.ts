export const SurveyResultPath = {
  put: {
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    tags: ['Enquete'],
    summary: 'API para criar para criar resposta de uma enquete',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/SurveyResultSchemaParams',
          },
        },
      },
    },
    parameters: [
      {
        in: 'path',
        name: 'surveyId',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/SurveyResultSchema',
            },
          },
        },
      },
      400: {
        $ref: '#/components/BadRequest',
      },
      403: {
        $ref: '#/components/Forbidden',
      },
      500: {
        $ref: '#/components/ServerError',
      },
    },
  },
};
