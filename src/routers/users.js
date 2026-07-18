import { Router } from 'express';
import { getCurrentUser, updateUserPhoto } from '../controllers/users.js';
import { parseFile } from '../middlewares/fileHandler.js';

import { checkToken } from '../middlewares/checkToken.js';

const usersRouter = Router();

usersRouter.use(checkToken);

usersRouter.patch('/avatar', parseFile.single('avatarUrl'), updateUserPhoto);

usersRouter.get('/current', getCurrentUser);

export default usersRouter;
