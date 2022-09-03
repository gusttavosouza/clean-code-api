export const Forbidden = {
  description: 'Acesso negado',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/ErrorSchema',
      },
    },
  },
};
