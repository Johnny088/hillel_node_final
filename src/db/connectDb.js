import { connect } from 'mongoose';
import { initMovies } from '../seeds/seedHandler.js';

export const connectDb = async () => {
  const DB_URL = process.env.DB_URL;

  try {
    await connect(DB_URL);

    await initMovies();

    console.log('connected to the database');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
