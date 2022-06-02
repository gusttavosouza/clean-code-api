import { Express } from 'express';
import { BodyParser } from '../middlewares/BodyParser';

export default (app: Express): void => {
  app.use(BodyParser);
};
