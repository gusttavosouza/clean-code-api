export const SurveyPaths = {
  get: {
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    tags: ['Enquete'],
    summary: 'API para listar todas as enquetes',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/SurveysSchema',
            },
          },
        },
      },
      403: {
        $ref: '#/components/Forbidden',
      },
      500: {
        $ref: '#/components/ServerError',
      },
    },
  },
  post: {
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    tags: ['Enquete'],
    summary: 'API para criar uma enquete',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/AddSurveySchema',
          },
        },
      },
    },
    responses: {
      204: {
        description: 'Sucesso',
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
