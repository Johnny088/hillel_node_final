import { Router } from 'express';
import {
  addNewMovie,
  getMovieById,
  getMovies,
  updateMovie,
  updateOrCreateMovie,
} from '../controllers/movies.js';
import { celebrate } from 'celebrate';
import {
  createMoviesSchema,
  getMoviesSchema,
  idSchema,
  updateMoviesSchema,
} from '../validation/movies.js';

const moviesRouter = Router();

moviesRouter.get('/', celebrate(getMoviesSchema), getMovies);

moviesRouter.get('/:id', celebrate(idSchema), getMovieById);

moviesRouter.post('/', celebrate(createMoviesSchema), addNewMovie);

moviesRouter.patch('/:id', celebrate(updateMoviesSchema), updateMovie);

moviesRouter.put('/:id', celebrate(updateMoviesSchema), updateOrCreateMovie);

export default moviesRouter;
