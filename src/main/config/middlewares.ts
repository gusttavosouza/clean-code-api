import { Express } from 'express';
import { Cors } from '../middlewares/Cors';
import { BodyParser } from '../middlewares/BodyParser';
import { ContentType } from '../middlewares/ContentType';

export default (app: Express): void => {
  app.use(BodyParser);
  app.use(Cors);
  app.use(ContentType);
};
