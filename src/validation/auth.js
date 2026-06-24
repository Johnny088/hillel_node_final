import { Joi, Segments } from 'celebrate';

export const signUpSchema = {
  [Segments.BODY]: Joi.object({
    userName: Joi.string().min(2),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export const sighInSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
