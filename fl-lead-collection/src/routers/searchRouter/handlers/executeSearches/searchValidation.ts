import Joi from "joi";

export const searchSchema = Joi.object({
  campaignName: Joi.string().required(),
  campaignDescription: Joi.string().required(),
  locationName: Joi.string().required(),
  roles: Joi.array().items(Joi.string()).required(),
  platforms: Joi.array().items(Joi.string()).required(),
});
