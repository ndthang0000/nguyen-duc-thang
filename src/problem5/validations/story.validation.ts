import Joi from 'joi';

const createStoryValidate = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    author: Joi.string().required(),
    content: Joi.string().required(),
    publish_at: Joi.date(),
    url: Joi.string().uri().required(),
    thumbnail_url: Joi.string().uri().required(),
    short_description: Joi.string(),
  }),
};

const getStoryByIdValidate = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const putStoryByIdValidate = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
  body: Joi.object().keys({
    title: Joi.string().required(),
    author: Joi.string().required(),
    content: Joi.string().required(),
    publish_at: Joi.date(),
    url: Joi.string().uri().required(),
    thumbnail_url: Joi.string().uri().required(),
    short_description: Joi.string(),
  }),
};

const deleteStoryByIdValidate = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const patchStoryByIdValidate = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    author: Joi.string(),
    content: Joi.string(),
    publish_at: Joi.date(),
    url: Joi.string().uri(),
    thumbnail_url: Joi.string().uri(),
    short_description: Joi.string(),
  }),
};

export {
  createStoryValidate,
  getStoryByIdValidate,
  putStoryByIdValidate,
  deleteStoryByIdValidate,
  patchStoryByIdValidate
}