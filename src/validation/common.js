import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

export const validateId = (id, utils) =>
  isValidObjectId(id) ? id : utils.message('Invalid id!');

export const idSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(validateId).required(),
  }),
};
