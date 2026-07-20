import { Router } from 'express';
import {
  addNewMovie,
  deleteMovie,
  getMovieById,
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
import { checkRoles } from '../middlewares/checkRoles.js';
import { idSchema } from '../validation/common.js';

const moviesRouter = Router();

moviesRouter.use(checkToken);

moviesRouter.get('/', celebrate(getMoviesSchema), getMovies);

moviesRouter.get('/:id', celebrate(idSchema), getMovieById);

moviesRouter.post(
  '/',
  checkRoles('admin'),
  celebrate(createMoviesSchema),
  addNewMovie,
);

moviesRouter.patch(
  '/:id',
  checkRoles('admin'),
  celebrate(updateMoviesSchema),
  updateMovie,
);

moviesRouter.put(
  '/:id',
  checkRoles('admin'),
  celebrate(updateMoviesSchema),
  updateOrCreateMovie,
);

moviesRouter.delete('/:id', checkRoles('admin'), deleteMovie);

export default moviesRouter;
