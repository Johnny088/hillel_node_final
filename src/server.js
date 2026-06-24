import 'dotenv/config';
import express from 'express';
import { connectDb } from './db/connectDb.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import moviesRouter from './routers/movies.js';
import authRouter from './routers/auth.js';
import usersRouter from './routers/users.js';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

app.use(notFoundHandler);

app.use(errors());
app.use(errorHandler);

await connectDb();

app.listen(PORT, () => {
  console.log('server is running');
});
