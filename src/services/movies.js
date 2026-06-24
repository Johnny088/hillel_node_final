import { Movie } from '../db/models/Movie.js';

export const getMoviesService = async ({
  page,
  limit,
  sortBy,
  sortOrder,
  search,
}) => {
  const skip = (page - 1) * limit;
  const movieQuery = Movie.find();
  if (search && search.trim()) {
    movieQuery.where({
      title: { $regex: search, $options: 'i' },
    });
  }
  const [totalCount, muvies] = await Promise.all([
    movieQuery.clone().countDocuments(),
    movieQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder }),
  ]);
  const totalPages = Math.ceil(totalCount / limit);

  return { muvies, totalCount, totalPages, page, limit };
};

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
