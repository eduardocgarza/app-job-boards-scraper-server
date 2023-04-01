import { IRawSearchObject, ISearchObject } from "@/types/appInterfaces";
import { pool } from "../databaseConfiguration";
import { searchesTable } from "../dbConstants";
import { DB_SEARCH_STATUSES, DB_SEARCH_STATUSES_HASHMAP } from "@/appConstants";

export default async function insertSearch(
  searchObject: IRawSearchObject,
): Promise<ISearchObject> {
  const client = await pool.connect();
  try {
    const { campaignName, campaignDescription, locationName, roles, platforms } =
      searchObject;
    const query = `
      INSERT INTO ${searchesTable} 
        (campaign_name, campaign_description, location_name, roles, platforms, search_status_id) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *
    `;
    const values = [
      campaignName,
      campaignDescription,
      locationName,
      roles,
      platforms,
      DB_SEARCH_STATUSES[0].statusId,
    ];
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
      searchStatus: DB_SEARCH_STATUSES_HASHMAP[searchItem.search_status_id],
    };
  } catch (e) {
    console.error("Error creating search record:", e);
    throw e;
  } finally {
    client.release();
  }
}
