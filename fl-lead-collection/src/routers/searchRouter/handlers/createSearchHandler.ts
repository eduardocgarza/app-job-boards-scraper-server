import insertSearch from "@/database/databaseActions/insertSearch";
import { IRawSearchObject, ISearchRoute } from "@/types/appInterfaces";
import { Response } from "express";

function createSearchObject(body: IRawSearchObject): IRawSearchObject {
  return {
    campaignName: body.campaignName,
    campaignDescription: body.campaignDescription,
    locationName: body.locationName,
    roles: body.roles,
    platforms: body.platforms,
  };
}

export default async function createSearchHandler(req: ISearchRoute, res: Response) {
  console.log("createSearchHandler");
  const rawSearchObject = createSearchObject(req.body);
  const searchObject = await insertSearch(rawSearchObject);
  return res.status(201).json(searchObject);
}
