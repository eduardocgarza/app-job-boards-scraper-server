import Joi from "joi";

export const apolloSchema = Joi.object({
  domains: Joi.array().items(Joi.string()).required(),
  titles: Joi.array().items(Joi.string()).required(),
  page: Joi.string(),
});
