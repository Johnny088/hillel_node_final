import { User } from '../db/models/User.js';

export const updateUsersPhotoService = async (id, secure_url) => {
  const result = await User.findByIdAndUpdate(
    id,
    { avatarUrl: secure_url },
    { returnDocument: 'after' },
  );
  if (!result) {
    return null;
  }
  return result.avatarUrl;
};
