import Joi from "joi";
import { ISearchObject, executeSearches } from "./executeSearches";
import { Request, Response } from "express";
import insertSearch from "@/database/databaseActions/insertSearch";

const searchSchema = Joi.object({
  campaignName: Joi.string().required(),
  campaignDescription: Joi.string().required(),
  locationName: Joi.string().required(),
  roles: Joi.array().items(Joi.string()).required(),
  platforms: Joi.array().items(Joi.string()).required(),
});

function createSearchObject(body: ISearchRouteBody): ISearchObject {
  return {
    searchId: body.searchId,
    campaignName: body.campaignName,
    campaignDescription: body.campaignDescription,
    locationName: body.locationName,
    roles: body.roles,
    platforms: body.platforms,
  };
}

interface ISearchRouteBody {
  searchId: string;
  campaignName: string;
  campaignDescription: string;
  locationName: string;
  roles: string[];
  platforms: string[];
}

interface ISearchRoute extends Request {
  body: ISearchRouteBody;
}

export default async function executeSearchRouterHandler(req: ISearchRoute, res: Response) {
  const { error } = searchSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const rawSearchObject = createSearchObject(req.body);
  const searchObject = await insertSearch(rawSearchObject);
  res.status(201).json(searchObject);
  await executeSearches(searchObject);
  return;
  // await createRawDataAirtables(searchId);
  // Update progress table
  // ---
}
