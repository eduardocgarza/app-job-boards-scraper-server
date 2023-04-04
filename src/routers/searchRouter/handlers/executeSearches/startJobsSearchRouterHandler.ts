import { Response } from "express";
import { searchSchema } from "../../validators/searchValidation";
import { executeSearches } from "./executeSearches";
import { ISearchRequest } from "@/types/requestInterfaces";
import getSearchObject from "@/database/databaseActions/getSearchObject";
import createSearchAirtables from "@/integrations/airtable/actions/createSearchAirtables/createSearchAirtables";

export default async function startJobsSearchRouterHandler(
  req: ISearchRequest,
  res: Response,
) {
  const { error } = searchSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const searchObject = await getSearchObject(req.body.searchId);
  await executeSearches(searchObject);
  return res.json({ message: "Fuck You" });
  // const airtableIds = await createSearchAirtables(searchObject.searchId);
  // return res.json(airtableIds);
}
