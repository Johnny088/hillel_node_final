import createHttpError from 'http-errors';
import { ID_NOT_FOUND_MSG } from '../constants.js';
import {
  addNewMovieService,
  deleteMovieService,
  getMovieByIdService,
  getMoviesService,
  updateMovieService,
} from '../services/movies.js';

export const getMovies = async (req, res) => {
  const { page, limit, sortBy, sortOrder, search, genre } = req.query;
  const movies = await getMoviesService({
    page,
    limit,
    sortBy,
    sortOrder,
    search,
    genre,
  });
  res.json(movies);
};

export const getMovieById = async (req, res) => {
  const { id } = req.params;
  const movie = await getMovieByIdService(id);
  if (!movie) {
    throw createHttpError(404, ID_NOT_FOUND_MSG);
  }
  res.json(movie);
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
    throw createHttpError(404, ID_NOT_FOUND_MSG);
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
    throw createHttpError(404, ID_NOT_FOUND_MSG);
  }
  res.json(movie);
};
