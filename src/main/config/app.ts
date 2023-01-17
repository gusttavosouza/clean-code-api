import express from 'express';
import setupMiddlewares from './middlewares';
import setupRoutes from './routes';
import setupStaticFiles from './static-files';
import setupSwagger from './Swagger';
import setupApolloServer from './ApolloServer';

const app = express();

setupApolloServer(app);
setupStaticFiles(app);
setupSwagger(app);
setupMiddlewares(app);
setupRoutes(app);

export default app;
