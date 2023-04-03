import { IRawSearchObject, ISearchObject } from "@/types/appInterfaces";
import { pool } from "../databaseConfiguration";
import { searchesTable } from "../dbConstants";
import { DB_SEARCH_STATUSES_HASHMAP } from "@/appConstants";
import searchConverterOut from "../databaseDataConverters/searchConverterOut";

export default async function insertSearches(
  searchObjects: IRawSearchObject[],
): Promise<ISearchObject[]> {
  const client = await pool.connect();
  try {
    const values = searchObjects.map(
      ({ campaignName, campaignDescription, locationName, roles, platforms }) => [
        campaignName,
        campaignDescription,
        locationName,
        roles,
        platforms,
      ],
    );
    const query = `
    INSERT INTO ${searchesTable} (
      campaign_name, campaign_description, location_name, roles, platforms) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *
    `;
    const results = await Promise.all(values.map((v) => client.query(query, v)));
    return results.map(({ rows: [searchItem] }) => searchConverterOut(searchItem));
  } catch (e) {
    console.error("Error creating search records:", e);
    throw e;
  } finally {
    client.release();
  }
}
