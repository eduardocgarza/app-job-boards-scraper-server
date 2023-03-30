import insertSearch from "@/database/databaseActions/insertSearch";
import { IRawSearchObject, ISearchRoute, ISearchRouteBody } from "@/types/appInterfaces";
import { searchSchema } from "./searchValidation";
import { Response } from "express";
import { executeSearches } from "./executeSearches";
import createSearchAirtables from "@/integrations/airtable/actions/createSearchAirtables/createSearchAirtables";

function createSearchObject(body: ISearchRouteBody): IRawSearchObject {
  return {
    campaignName: body.campaignName,
    campaignDescription: body.campaignDescription,
    locationName: body.locationName,
    roles: body.roles,
    platforms: body.platforms,
  };
}

export default async function executeSearchRouterHandler(
  req: ISearchRoute,
  res: Response,
) {
  const { error } = searchSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const rawSearchObject = createSearchObject(req.body);
  const searchObject = await insertSearch(rawSearchObject);
  res.status(201).json(searchObject);
  await executeSearches(searchObject);
  await createSearchAirtables(searchObject.searchId);
}
