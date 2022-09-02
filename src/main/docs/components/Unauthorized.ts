export const Unauthorized = {
  description: 'Credenciais inválidas',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/ErrorSchema',
      },
    },
  },
};
