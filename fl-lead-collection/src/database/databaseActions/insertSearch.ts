import { IRawSearchObject, ISearchObject } from "@/types/appInterfaces";
import { pool } from "../databaseConfiguration";
import { DB_TABLE_NAMES } from "../dbConstants";

export default async function insertSearch(
  searchObject: IRawSearchObject,
): Promise<ISearchObject> {
  const client = await pool.connect();
  try {
    const { campaignName, campaignDescription, locationName, roles, platforms } =
      searchObject;
    const query = `
      INSERT INTO ${DB_TABLE_NAMES.searchesTable} 
        (campaign_name, campaign_description, location_name, roles, platforms) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *
    `;
    const values = [campaignName, campaignDescription, locationName, roles, platforms];
    const {
      rows: [searchItem],
    } = await client.query(query, values);
    return {
      searchId: searchItem.search_id,
      campaignName: searchItem.campaign_name,
      campaignDescription: searchItem.campaign_description,
      locationName: searchItem.location_name,
      roles: searchItem.roles,
      platforms: searchItem.platforms,
      createdAt: searchItem.created_at,
    };
  } catch (e) {
    console.error("Error creating search record:", e);
    throw e;
  } finally {
    client.release();
  }
}
