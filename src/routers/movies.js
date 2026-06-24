import { Router } from 'express';
import {
  addNewMovie,
  getMovies,
  updateMovie,
  updateOrCreateMovie,
} from '../controllers/movies.js';
import { celebrate } from 'celebrate';
import {
  createMoviesSchema,
  getMoviesSchema,
  updateMoviesSchema,
} from '../validation/movies.js';
import { checkToken } from '../middlewares/checkToken.js';

const moviesRouter = Router();

moviesRouter.use(checkToken);

moviesRouter.get('/', celebrate(getMoviesSchema), getMovies);

moviesRouter.post('/', celebrate(createMoviesSchema), addNewMovie);

moviesRouter.patch('/:id', celebrate(updateMoviesSchema), updateMovie);

moviesRouter.put('/:id', celebrate(updateMoviesSchema), updateOrCreateMovie);

export default moviesRouter;
