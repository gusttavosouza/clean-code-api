import { NextFunction, Request, Response } from 'express';

export const ContentType = (
  _: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.type('json');
  next();
};
