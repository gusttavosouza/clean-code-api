import {
  ErrorSchema,
  LoginSchema,
  AccountSchema,
  SurveyAnswerSchema,
  SurveySchema,
  SurveysSchema,
  ApiKeyAuthSchema,
  AddSurveySchema,
  SurveyResultSchema,
  SurveyResultSchemaParams,
  SurveyResultAnswerSchema,
  SignUpSchema,
} from './schemas';
import { BadRequest, ServerError, Unauthorized, Forbidden } from './components';
import { SignUpPath } from './paths/SignUpPath';
import { SurveyResultPath } from './paths/SurveyResultPath';
import { LoginPaths } from './paths/LoginPath';
import { SurveyPaths } from './paths/SurveyPath';

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
    '/surveys/{surveyId}/results': SurveyResultPath,
  },
  schemas: {
    AccountSchema,
    LoginSchema,
    ErrorSchema,
    SurveyAnswerSchema,
    SurveySchema,
    SurveysSchema,
    SignUpSchema,
    AddSurveySchema,
    SurveyResultSchema,
    SurveyResultSchemaParams,
    SurveyResultAnswerSchema,
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
