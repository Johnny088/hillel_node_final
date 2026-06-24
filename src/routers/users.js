import { Router } from 'express';
import { updateUserPhoto } from '../controllers/users.js';
import { parseFile } from '../middlewares/fileHandler.js';

import { checkToken } from '../middlewares/checkToken.js';

const usersRouter = Router();

usersRouter.use(checkToken);

usersRouter.patch('/', parseFile.single('avatarUrl'), updateUserPhoto);

export default usersRouter;
