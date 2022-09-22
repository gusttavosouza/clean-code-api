import express from 'express';

import middlewares from './middlewares';
import routes from './routes';
import swagger from './swagger';
import staticFiles from './staticFiles';

const app = express();

swagger(app);
staticFiles(app);
middlewares(app);
routes(app);

export default app;
