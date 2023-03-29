import { IRawSearchObject, ISearchObject } from "@/controllers/search/executeSearches";
import { pool } from "../databaseConfiguration";
import { DB_TABLE_NAMES } from "../dbConstants";

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
    INSERT INTO ${DB_TABLE_NAMES.searchesTable} (
      campaign_name, campaign_description, location_name, roles, platforms) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *
    `;
    const results = await Promise.all(values.map((v) => client.query(query, v)));
    return results.map(({ rows: [searchItem] }) => ({
      searchId: searchItem.search_id,
      campaignName: searchItem.campaign_name,
      campaignDescription: searchItem.campaign_description,
      locationName: searchItem.location_name,
      roles: searchItem.roles,
      platforms: searchItem.platforms,
      createdAt: searchItem.created_at,
    }));
  } catch (e) {
    console.error("Error creating search records:", e);
    throw e;
  } finally {
    client.release();
  }
}
