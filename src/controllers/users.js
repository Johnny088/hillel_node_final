import createHttpError from 'http-errors';
import { saveFile } from '../utils/cloudinary.js';
import { updateUsersPhotoService } from '../services/users.js';
import { ID_NOT_FOUND_MSG } from '../constants.js';
export const updateUserPhoto = async (req, res) => {
  if (!req.file) {
    throw createHttpError(404, 'there is no file');
  }

  const id = req.user._id;

  const { secure_url } = await saveFile(req.file.buffer);

  const result = await updateUsersPhotoService(id, secure_url);

  if (!result) {
    throw createHttpError(404, ID_NOT_FOUND_MSG);
  }

  res.json(result);
};
