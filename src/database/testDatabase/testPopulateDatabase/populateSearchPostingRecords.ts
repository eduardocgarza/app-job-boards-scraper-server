import { pool } from "@/database/databaseConfiguration";
import { searchJobPostingsTable } from "@/database/dbConstants";

type TValuesMap = Array<string | number>[];

function createValuesMap(values: TValuesMap) {
  return values.map((_, i) => `($${2 * i + 1}, $${2 * i + 2})`).join(",");
}

export default async function populateSearchPostingRecords(searchId: string, postingIds: string[]) {
  if (!postingIds.length) return;
  const values = postingIds.map((postingId) => [postingId, searchId]);
  const valuesMap = createValuesMap(values);
  const searchPostingsQuery = `
    INSERT INTO ${searchJobPostingsTable} 
      (posting_id, search_id)
    VALUES ${valuesMap};
  `;
  const client = await pool.connect();
  try {
    await client.query(searchPostingsQuery, values.flat());
  } catch (error) {
    throw new Error("Failed to populateSearchPostingRecords: " + error);
  } finally {
    client.release();
  }
}
