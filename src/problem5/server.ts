import express from 'express';
import router from './routes/v1/api.route';
import ApiError from './infrastructure/exception/api.error';
import httpStatus from 'http-status';
import { errorConverter, errorHandler } from './infrastructure/exception/error.handler';
import configData from './infrastructure/config';
import morganMiddleware from './infrastructure/logging/morgan';

const app = express();
const port = process.env.PORT || 3000;

if (configData.env !== 'test') {
  app.use(morganMiddleware.successHandler);
  app.use(morganMiddleware.errorHandler);
}

app.use('/v1/api', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});