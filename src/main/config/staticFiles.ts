import express, { Express } from 'express';
import path from 'path';

export default (app: Express): void => {
  app.use(
    '/file',
    express.static(path.resolve(__dirname, '..', '..', 'public')),
  );
};
