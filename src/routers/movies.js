import { Router } from 'express';
import {
  addNewMovie,
  getMovieById,
  getMovies,
  updateMovie,
  updateOrCreateMovie,
} from '../controllers/movies.js';

const moviesRouter = Router();

moviesRouter.get('/', getMovies);

moviesRouter.get('/:id', getMovieById);

moviesRouter.post('/', addNewMovie);

moviesRouter.patch('/:id', updateMovie);

moviesRouter.put('/:id', updateOrCreateMovie);

export default moviesRouter;
