import morgan, { StreamOptions } from 'morgan';
import configData from '../config';
import logger from './logger';

morgan.token('message', (req, res) => res.locals.errorMessage || '');

const getIpFormat = (): string => (configData.env === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message: string) => logger.info(message.trim()) } as StreamOptions,
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message: string) => logger.error(message.trim()) } as StreamOptions,
});
const morganMiddleware = {
  successHandler,
  errorHandler,
}
export default morganMiddleware;
