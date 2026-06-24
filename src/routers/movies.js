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

const muviesRouter = Router();

muviesRouter.use(checkToken);

muviesRouter.get('/', celebrate(getMoviesSchema), getMovies);

muviesRouter.post('/', celebrate(createMoviesSchema), addNewMovie);

muviesRouter.patch('/:id', celebrate(updateMoviesSchema), updateMovie);

muviesRouter.put('/:id', celebrate(updateMoviesSchema), updateOrCreateMovie);

export default muviesRouter;
