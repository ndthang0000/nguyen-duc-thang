import Joi, { Schema } from 'joi';
import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../infrastructure/exception/api.error';
import pick from '../infrastructure/utils/pick';

const validate = (schema: Record<string, Schema>) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema) as (keyof typeof req)[]);
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

export default validate
