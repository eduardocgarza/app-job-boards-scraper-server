import { pool } from "@/database/databaseConfiguration";
import { IPostingDetailsInput } from "./getGlassdoorPostingsDetailedData";
import { jobPostingsTable, searchJobPostingsTable } from "@/database/dbConstants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function selectivePostingConverterOut(obj: any) {
  return {
    postingId: obj.posting_id,
    postingURL: obj.posting_url,
    companyId: obj.company_id,
  };
}

export default async function glassdoorGetPostingIds(
  searchId: string,
): Promise<IPostingDetailsInput[]> {
  const client = await pool.connect();
  const query = `
    SELECT jp.posting_id, jp.posting_url, company_id
    FROM ${jobPostingsTable} jp
    JOIN ${searchJobPostingsTable} sjp 
      ON jp.posting_id = sjp.posting_id
    WHERE 
      sjp.search_id = $1 AND 
      jp.verified = false;
  `;

  try {
    const result = await client.query(query, [searchId]);
    return result.rows.map(selectivePostingConverterOut);
  } catch (error) {
    console.error("Error executing query:", error);
    return [];
  } finally {
    client.release();
  }
}
