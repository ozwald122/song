import * as Joi from 'joi';

export const envSchema: Joi.ObjectSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'local').default('local'),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRE: Joi.string(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_EXPIRE: Joi.string(),
});
