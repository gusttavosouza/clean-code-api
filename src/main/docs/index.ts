import { LoginSchema } from './schemas/LoginSchema';
import { AccountSchema } from './schemas/AccountSchema';
import { LoginPaths } from './paths/LoginPath';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'API do curso do MANGO',
    version: '1.0.0',
  },
  servers: [
    {
      url: '/api',
    },
  ],
  tags: [
    {
      name: 'Login',
    },
  ],
  paths: {
    '/login': LoginPaths,
  },
  schemas: {
    AccountSchema,
    LoginSchema,
  },
};
