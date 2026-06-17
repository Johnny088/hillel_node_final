import 'dotenv/config';
import express from 'express';
import { connectDb } from './db/connectDb.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import moviesRouter from './routers/movies.js';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use('/movies', moviesRouter);

app.use(notFoundHandler);

await connectDb();

app.listen(PORT, () => {
  console.log('server is running');
});
