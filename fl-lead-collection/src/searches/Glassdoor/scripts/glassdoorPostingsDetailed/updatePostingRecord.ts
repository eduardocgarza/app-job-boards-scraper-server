import { pool } from "@/database/databaseConfiguration";
import { DB_TABLE_NAMES } from "@/database/dbConstants";

export default async function updateJobPostingRecord(
  jobPostingId: string,
  jobDescriptionText: string,
) {
  await pool.query(
    `
      UPDATE ${DB_TABLE_NAMES.jobPostingsTable}
      SET 
        job_description = $1, 
        verified = true
      WHERE 
        posting_id = $2
    `,
    [jobDescriptionText, jobPostingId],
  );
}
