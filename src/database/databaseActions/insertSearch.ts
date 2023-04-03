import { IRawSearchObject, ISearchObject } from "@/types/appInterfaces";
import { pool } from "../databaseConfiguration";
import { searchesTable } from "../dbConstants";
import searchConverterOut from "../databaseDataConverters/searchConverterOut";

export default async function insertSearch(
  searchObject: IRawSearchObject,
): Promise<ISearchObject> {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO ${searchesTable} 
        (
          campaign_name, 
          campaign_description, 
          location_name, 
          roles, 
          platforms
        ) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *
    `;
    const values = [
      searchObject.campaignName,
      searchObject.campaignDescription,
      searchObject.locationName,
      searchObject.roles,
      searchObject.platforms,
    ];
    const response = await client.query(query, values);
    return searchConverterOut(response.rows[0]);
  } catch (e) {
    console.error("Error creating search record:", e);
    throw e;
  } finally {
    client.release();
  }
}
