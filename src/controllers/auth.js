import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import {
  createSession,
  createUser,
  deleteSessionById,
  deleteSessionByUserId,
  findSessionById,
  findUserByEmail,
} from '../services/auth.js';
import { clearCookies, setCookies } from '../utils/cookies.js';
import { User } from '../db/models/User.js';

export const signUp = async (req, res) => {
  const userRole = await User.countDocuments();

  const role = userRole === 0 ? 'admin' : 'user';

  const { userName, email, password } = req.body;

  const user = await findUserByEmail(email);

  if (user) {
    throw createHttpError(409, 'User with such email already exists!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await createUser({
    userName,
    email,
    password: hashedPassword,
    role,
  });

  const session = await createSession(newUser._id);

  setCookies(session, res);

  res.status(201).json({ userName: newUser.userName, email: newUser.email });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (!user) {
    throw (401, 'invalid credentials');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw (401, 'invalid credentials');
  }
  await deleteSessionByUserId(user._id);

  const session = await createSession(user._id);

  setCookies(session, res);

  res.json({ username: user.userName, email });
};

export const logout = async (req, res) => {
  const { sessionId } = req.cookies;
  await deleteSessionById(sessionId);

  clearCookies(res);

  res.sendStatus(204);
};

export const refreshSession = async (req, res) => {
  const { sessionId } = req.cookies;

  const session = await findSessionById(sessionId);

  if (!session) {
    throw createHttpError(401, "session wasn't found");
  }

  const isRefreshTokenActual = session.refreshTokenExpiration > Date.now();

  if (!isRefreshTokenActual) {
    clearCookies(res);
    throw createHttpError(401, "Refresh token isn't valid");
  }
  await deleteSessionById(sessionId);

  const newSession = await createSession(session.userId);
  setCookies(newSession, res);
  res.sendStatus(204);
};
