import { searchSchema } from "../../validators/searchValidation";
import { Response } from "express";
import createSearchAirtables from "@/integrations/airtable/actions/createSearchAirtables/createSearchAirtables";
import { executeSearches } from "./executeSearches";
import { ISearchRequest } from "@/types/requestInterfaces";
import { pool } from "@/database/databaseConfiguration";
import { searchesTable } from "@/database/dbConstants";
import { JOB_PLATFORMS } from "@/appConstants";
import { IExecuteSearchObject } from "@/types/appInterfaces";

async function getSearchObject(searchId: string): Promise<IExecuteSearchObject> {
  const client = await pool.connect();
  try {
    const query = `
      SELECT * 
      FROM ${searchesTable}
      WHERE search_id = $1;
    `;
    const result = await client.query(query, [searchId]);
    const searchObject = result.rows[0];
    return {
      searchId: searchObject.search_id,
      locationName: searchObject.location_name,
      platforms: JOB_PLATFORMS.getNames(),
    };
  } catch (e) {
    throw new Error("searchId not found in searches");
  } finally {
    client.release();
  }
}

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
  await createSearchAirtables(searchObject.searchId);
}
