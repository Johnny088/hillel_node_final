import createHttpError from 'http-errors';

export const checkRoles = (...isAllowedRoles) => {
  return async (req, res, next) => {
    if (!isAllowedRoles.includes(req.user.role)) {
      throw createHttpError(403, "you don't have permission");
    }
    next();
  };
};
