import axios from 'axios';
import { Movie } from '../db/models/Movie.js';
import 'dotenv/config';
const TMDB_API_KEY = process.env.TMDB_KEY;
const TMD_API_BASE_URL = process.env.TMDB_BASE_URL;

export const GENRES = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

export const initMovies = async () => {
  const count = await Movie.countDocuments();

  if (count > 0) {
    return;
  }
  let totalMovies = [];

  for (const [genreId, genreName] of Object.entries(GENRES)) {
    const response = await axios.get(`${TMD_API_BASE_URL}/discover/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        with_genres: genreId,
        language: 'en-US',
        sort_by: 'popularity.desc',
        page: 1,
      },
    });

    if (!response || !response.data.results) {
      continue;
    }

    const currentMovies = response.data.results;

    for (const movie of currentMovies) {
      const trailerResponse = await axios
        .get(`${TMD_API_BASE_URL}/movie/${movie.id}/videos`, {
          params: { api_key: TMDB_API_KEY, language: 'en-US' },
        })
        .catch(() => null);
      let trailer;
      if (
        trailerResponse &&
        trailerResponse.data &&
        trailerResponse.data.results
      ) {
        trailer = trailerResponse.data.results.find(
          video => video.site === 'YouTube' && video.type === 'Trailer',
        );
      }

      totalMovies.push({
        title: movie.title,
        description: movie.overview,
        release_date: movie.release_date
          ? new Date(movie.release_date).getFullYear()
          : 2026,
        vote_average: movie.vote_average,
        posterUrl: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
        trailerUrl: trailer
          ? `https://www.youtube.com/watch?v=${trailer.key}`
          : null,
        genre: genreName,
      });
    }
  }

  const uniqueMovies = Array.from(
    new Map(totalMovies.map(movie => [movie.title, movie])).values(),
  );

  await Movie.insertMany(uniqueMovies);
};
