import { Schema, model } from 'mongoose';

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    release_date: {
      type: Date,
      required: true,
    },
    vote_average: {
      type: Number,
    },
    posterUrl: {
      type: String,
    },
    trailerUrl: {
      type: String,
    },
    genre: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true },
);

export const Movie = model('movie', movieSchema);
