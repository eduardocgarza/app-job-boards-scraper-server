import { pool } from "@/database/databaseConfiguration";
import { searchJobPostingsTable } from "@/database/dbConstants";

type TValuesMap = Array<string | number>[];

function createValuesMap(values: TValuesMap) {
  return values.map((_, i) => `($${2 * i + 1}, $${2 * i + 2})`).join(",");
}

export default async function testPopulateSearchPostingRecords(
  searchId: string,
  postingIds: string[],
) {
  const values = postingIds.map((postingId) => [postingId, searchId]);
  const valuesMap = createValuesMap(values);
  const searchPostingsQuery = `
    INSERT INTO ${searchJobPostingsTable} 
      (posting_id, search_id)
    VALUES ${valuesMap}
    ON CONFLICT 
      (posting_id, search_id)
    DO UPDATE SET
      posting_id = excluded.posting_id,
      search_id = excluded.search_id
  `;
  await pool.query(searchPostingsQuery, values.flat());
}
