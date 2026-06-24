import { Movie } from '../db/models/Movie.js';

export const getMoviesService = async ({
  page,
  limit,
  sortBy,
  sortOrder,
  search,
}) => {
  const skip = (page - 1) * limit;
  const muvieQuery = Movie.find();
  if (search && search.trim()) {
    muvieQuery.where({
      title: { $regex: search, $options: 'i' },
    });
  }
  const [totalCount, muvies] = await Promise.all([
    muvieQuery.clone().countDocuments(),
    muvieQuery
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
