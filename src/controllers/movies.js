import { ID_NOT_FOUND_MSG } from '../constants.js';
import {
  addNewMovieService,
  deleteMovieService,
  getMoviesService,
  updateMovieService,
} from '../services/movies.js';

export const getMovies = async (req, res) => {
  const { page, limit, sortBy, sortOrder, search } = req.query;
  const movies = await getMoviesService({
    page,
    limit,
    sortBy,
    sortOrder,
    search,
  });
  res.json(movies);
};

export const addNewMovie = async (req, res) => {
  const data = req.body;
  const movie = await addNewMovieService(data);
  res.status(201).json(movie);
};

export const updateMovie = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await updateMovieService(id, data);

  if (!result) {
    res.status(404).json(ID_NOT_FOUND_MSG);
  }

  res.json(result.data);
};

export const updateOrCreateMovie = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const { data, isUpdated } = await updateMovieService(id, body, {
    upsert: true,
  });
  res.status(isUpdated ? 200 : 201).json(data);
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;
  const movie = await deleteMovieService(id);
  if (!movie) {
    res.status(404).json(ID_NOT_FOUND_MSG);
  }
  res.status(204);
};
