import { Joi, Segments } from 'celebrate';
import { MUVIE_GENRES } from '../constants';
import { isValidObjectId } from 'mongoose';

const validateId = (id, utils) =>
  isValidObjectId(id) ? id : utils.message('invalid id');

export const getMoviesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().positive().default(1),
    limit: Joi.number().integer().min(5).max(20).default(5),
    sortBy: Joi.string().valid('title', 'genre'),
    sortOrder: Joi.string.valid('asc', 'desc').default('asc'),
    search: Joi.string(),
  }),
};

export const createMoviesSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(3).required,
    describtion: Joi.string(),
    release_data: Joi.date().min('1895-01-01').max('now').messages({
      'date.min': "realese data can't be earlier than 1895",
      'date.max': "realese data can't be more than current data",
    }),
    vote_average: Joi.number().min(1).max(10),
    trailer: Joi.string().required(),
    genre: Joi.string().valid(...MUVIE_GENRES),
  }),
};

export const updateMoviesSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(3),
    describtion: Joi.string(),
    release_data: Joi.date().min('1895-01-01').max('now').messages({
      'date.min': "realese data can't be earlier than 1895",
      'date.max': "realese data can't be more than current data",
    }),
    vote_average: Joi.number().min(1).max(10),
    trailer: Joi.string(),
    genre: Joi.string().valid(...MUVIE_GENRES),
  }),
};

export const idSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(validateId).required(),
  }),
};
