import Joi from "joi";
import { createSearchRecord } from "../../db/testTables.js";
import { executeSearches } from "./executeSearches.js";

const searchSchema = Joi.object({
  campaignName: Joi.string().required(),
  campaignDescription: Joi.string().required(),
  locationName: Joi.string().required(),
  roles: Joi.array().items(Joi.string()).required(),
  platforms: Joi.array().items(Joi.string()).required(),
});

function createSearchObject(reqBody) {
  return {
    searchId: reqBody.searchId,
    campaignName: reqBody.campaignName,
    campaignDescription: reqBody.campaignDescription,
    locationName: reqBody.locationName,
    roles: reqBody.roles,
    platforms: reqBody.platforms,
  }
}

export default async function searchRouteHandler(req, res) {
  const { error } = searchSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const searchObject = createSearchObject(req.body)
  const updatedSearchObject = await createSearchRecord(searchObject);
  res.status(201).json({ searchId: updatedSearchObject.searchId });

  await executeSearches(updatedSearchObject)
  console.log("Search complete")
  return
  await createRawDataAirtables(searchId)

  // Update progress table
  // --- 
}
