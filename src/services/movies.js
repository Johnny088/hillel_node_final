import { Movie } from '../db/models/Movie.js';

export const getMoviesService = () => Movie.find();

export const getMovieByIdService = id => Movie.findById(id);

export const addNewMovieService = data => Movie.create(data);

export const updateMovieService = async (id, data, options) => {
  const result = await Movie.findByIdAndUpdate(id, data, {
    returnDocument: 'after',
    includeResultMetadata: true,
    ...options,
  });
  if (!result) {
    return null;
  }
  return {
    data: result.value,
    isUpdated: result.lastErrorObject.updatedExisting,
  };
};

export const deleteMovieService = async id => Movie.findByIdAndDelete(id);
