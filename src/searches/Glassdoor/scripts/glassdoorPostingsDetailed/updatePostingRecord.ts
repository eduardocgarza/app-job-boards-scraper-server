import { pool } from "@/database/databaseConfiguration";
import { jobPostingsTable } from "@/database/dbConstants";

export async function updatePostingRecordAsExpired(jobPostingId: string) {
  const query = `
    UPDATE ${jobPostingsTable}
    SET 
      expired = true,
      verified = true
    WHERE posting_id = $1;
  `;
  await pool.query(query, [jobPostingId]);
}

export default async function updatePostingRecord(jobPostingId: string, jobDescriptionText: string) {
  const query = `
    UPDATE ${jobPostingsTable}
    SET 
      job_description = $1, 
      verified = true
    WHERE 
      posting_id = $2
  `;
  const client = await pool.connect();
  try {
    await client.query(query, [jobDescriptionText, jobPostingId]);
  } catch (error) {
    throw new Error("Failed to updatePostingRecord: " + error);
  } finally {
    client.release();
  }
}
