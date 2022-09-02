export const ServerError = {
  description: 'Problema no Servidor',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/ErrorSchema',
      },
    },
  },
};
