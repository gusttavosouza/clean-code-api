import swaggerConfig from '@main/docs';
import { NoCache } from '@main/middlewares/NoCache';
import { Express } from 'express';
import { serve, setup } from 'swagger-ui-express';

export default (app: Express): void => {
  app.use('/api/docs', NoCache, serve, setup(swaggerConfig));
};
