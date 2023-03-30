import { pool } from "@/database/databaseConfiguration";
import { DB_TABLE_NAMES } from "@/database/dbConstants";
import { IPostingDetailsInput } from "./getGlassdoorPostingsDetailedData";

export default async function glassdoorGetPostingIds(
  searchId: string,
): Promise<IPostingDetailsInput[]> {
  const client = await pool.connect();
  const query = `
    SELECT jp.posting_id, jp.posting_url, company_id
    FROM ${DB_TABLE_NAMES.jobPostingsTable} jp
    JOIN ${DB_TABLE_NAMES.searchJobPostingsTable} sjp 
      ON jp.posting_id = sjp.posting_id
    WHERE 
      sjp.search_id = $1 AND 
      jp.verified = false;
  `;

  try {
    const result = await client.query(query, [searchId]);
    return result.rows.map((row) => ({
      postingId: row.posting_id,
      postingURL: row.posting_url,
      companyId: row.company_id,
    }));
  } catch (error) {
    console.error("Error executing query:", error);
    return [];
  } finally {
    client.release();
  }
}
