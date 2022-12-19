import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';

import globalExceptionHandler from '../../infra/http/middlewares/globalExceptionHandler';
import router from './routes';

const app = express();

app.use(express.json());
app.use(router);
app.use(globalExceptionHandler);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Server started on port 3333!');
});
