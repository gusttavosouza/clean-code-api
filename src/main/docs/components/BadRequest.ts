export const BadRequest = {
  description: 'Requisição Invalid',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/ErrorSchema',
      },
    },
  },
};
