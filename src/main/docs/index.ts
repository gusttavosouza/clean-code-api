import { ErrorSchema, LoginSchema, AccountSchema } from './schemas';
import { LoginPaths } from './paths/LoginPath';
import { BadRequest, ServerError, Unauthorized } from './components';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'API do curso do MANGO',
    version: '1.0.0',
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://opensource.org/licenses/GPL-3.0',
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
    ErrorSchema,
  },
  components: {
    BadRequest,
    ServerError,
    Unauthorized,
  },
};
