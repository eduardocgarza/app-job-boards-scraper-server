import Joi from "joi";

export const snovioSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  domain: Joi.string(),
});
