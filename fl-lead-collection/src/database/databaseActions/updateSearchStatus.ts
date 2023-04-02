import { pool } from "../databaseConfiguration";
import { searchesTable } from "../dbConstants";

export default async function updateSearchStatus(
  searchId: string,
  searchStatusId: number,
) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const query = `
      UPDATE ${searchesTable}
      SET 
        search_status_id = $1
      WHERE 
        search_id = $2
      RETURNING *;
    `;
    const values = [searchStatusId, searchId];
    const result = await client.query(query, values);
    await client.query("COMMIT");

    if (result.rows.length > 0) {
      console.log(result.rows[0]);
      return result.rows[0];
    } else {
      throw new Error(`Search with ID ${searchId} not found.`);
    }
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}
