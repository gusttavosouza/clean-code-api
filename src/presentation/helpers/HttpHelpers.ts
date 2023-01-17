import { HttpResponse } from '@presentation/protocols';
import { InternalError, UnauthorizedError } from '@presentation/errors';

export const BadRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const Forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
});

export const Unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(),
});

export const ServerError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new InternalError(error.stack),
});

export const Success = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const NoContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
});
