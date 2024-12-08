import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().required().min(3).max(20),
  password: Joi.string().required().min(2).max(12),
  email: Joi.string().required().email(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(2).max(12),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required().min(2).max(12),
  token: Joi.string().required(),
});
