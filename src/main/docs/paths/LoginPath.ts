export const LoginPaths = {
  post: {
    tags: ['Login'],
    summary: 'API para autenticar usuário',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/LoginSchema',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/AccountSchema',
            },
          },
        },
      },
    },
    400: {
      description: 'Bad Request',
    },
  },
};
