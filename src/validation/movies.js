import { Joi, Segments } from 'celebrate';
import { MOVIE_GENRES } from '../constants.js';
import { validateId } from './common.js';

export const getMoviesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().positive().default(1),
    limit: Joi.number().integer().min(5).max(30).default(10),
    sortBy: Joi.string().valid('title', 'genre').default('title'),
    sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
    search: Joi.string(),
    genre: Joi.string(),
  }),
};

export const createMoviesSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string(),
    releaseDate: Joi.date().min('1895-01-01').max('now').messages({
      'date.min': "realese data can't be earlier than 1895",
      'date.max': "realese data can't be more than current data",
    }),
    voteAverage: Joi.number().min(1).max(10),
    posterUrl: Joi.string(),
    trailerUrl: Joi.string().required(),
    genre: Joi.array()
      .items(Joi.string().valid(...MOVIE_GENRES))
      .default([]),
  }),
};

export const updateMoviesSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(3),
    description: Joi.string(),
    releaseDate: Joi.date().min('1895-01-01').max('now').messages({
      'date.min': "realese data can't be earlier than 1895",
      'date.max': "realese data can't be more than current data",
    }),
    voteAverage: Joi.number().min(1).max(10),
    posterUrl: Joi.string(),
    trailerUrl: Joi.string(),
    genre: Joi.array()
      .items(Joi.string().valid(...MOVIE_GENRES))
      .default([]),
  }).min(1),
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(validateId).required(),
  }),
};
