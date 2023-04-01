import { searchSchema } from "./searchValidation";
import { Response } from "express";
import createSearchAirtables from "@/integrations/airtable/actions/createSearchAirtables/createSearchAirtables";
import { ISearchRoute } from "@/types/appInterfaces";
import { executeSearches } from "./executeSearches";

export default async function executeSearchRouterHandler(
  req: ISearchRoute,
  res: Response,
) {
  const { error } = searchSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  await executeSearches(searchObject);
  await createSearchAirtables(searchObject.searchId);
}
