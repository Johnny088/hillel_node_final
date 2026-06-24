import { Schema, model } from 'mongoose';

const movieSchema = new Schema(
  {
    movieId: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    describtion: {
      type: String,
    },
    release_data: {
      type: Date,
      required: true,
    },
    vote_average: {
      type: Number,
    },
    trailer: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true },
);

export const Movie = model('movie', movieSchema);
