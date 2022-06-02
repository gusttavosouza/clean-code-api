import { Express } from 'express';
import { cors } from '../middlewares/Cors';
import { BodyParser } from '../middlewares/BodyParser';

export default (app: Express): void => {
  app.use(BodyParser);
  app.use(cors);
};
