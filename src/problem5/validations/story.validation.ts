import Joi from 'joi'

const createStoryValidate = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    author: Joi.string().required(),
    content: Joi.string().required(),
    publish_at: Joi.date(),
    url: Joi.string().uri().required(),
    thumbnail_url: Joi.string().uri().required(),
    short_description: Joi.string()
  })
}

const getStoryByIdValidate = {
  params: Joi.object().keys({
    id: Joi.number().required()
  })
}

const putStoryByIdValidate = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  body: Joi.object().keys({
    title: Joi.string().required(),
    author: Joi.string().required(),
    content: Joi.string().required(),
    publish_at: Joi.date(),
    url: Joi.string().uri().required(),
    thumbnail_url: Joi.string().uri().required(),
    short_description: Joi.string()
  })
}

const deleteStoryByIdValidate = {
  params: Joi.object().keys({
    id: Joi.number().required()
  })
}

const patchStoryByIdValidate = {
  params: Joi.object().keys({
    id: Joi.number().required()
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    author: Joi.string(),
    content: Joi.string(),
    publish_at: Joi.date(),
    url: Joi.string().uri(),
    thumbnail_url: Joi.string().uri(),
    short_description: Joi.string()
  })
}

const paginateValidate = {
  query: Joi.object().keys({
    limit: Joi.number().integer().min(1).max(100),
    page: Joi.number().integer().min(1),
    sortBy: Joi.string()
      .valid('created_at:asc', 'created_at:desc', 'publish_at:asc', 'publish_at:desc', 'title:asc', 'title:desc')
      .default('created_at:desc'),
    title: Joi.string(),
    author: Joi.string(),
    content: Joi.string()
  })
}

export {
  createStoryValidate,
  getStoryByIdValidate,
  putStoryByIdValidate,
  deleteStoryByIdValidate,
  patchStoryByIdValidate,
  paginateValidate
}
