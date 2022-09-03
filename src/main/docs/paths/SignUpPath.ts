export const SignUpPath = {
  post: {
    tags: ['Login'],
    summary: 'API para criar conta de um usuário',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/SignUpSchema',
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
