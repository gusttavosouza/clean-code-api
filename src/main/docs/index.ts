import { SignUpSchema } from './schemas/SignUpSchema';
import {
  ErrorSchema,
  LoginSchema,
  AccountSchema,
  SurveyAnswerSchema,
  SurveySchema,
  SurveysSchema,
  ApiKeyAuthSchema,
} from './schemas';
import { LoginPaths } from './paths/LoginPath';
import { BadRequest, ServerError, Unauthorized, Forbidden } from './components';
import { SignUpPath, SurveyPaths } from './paths';

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
    {
      name: 'Enquete',
    },
  ],
  paths: {
    '/login': LoginPaths,
    '/signup': SignUpPath,
    '/surveys': SurveyPaths,
  },
  schemas: {
    AccountSchema,
    LoginSchema,
    ErrorSchema,
    SurveyAnswerSchema,
    SurveySchema,
    SurveysSchema,
    SignUpSchema,
  },
  components: {
    securitySchemes: {
      apiKeyAuth: ApiKeyAuthSchema,
    },
    BadRequest,
    ServerError,
    Unauthorized,
    Forbidden,
  },
};
