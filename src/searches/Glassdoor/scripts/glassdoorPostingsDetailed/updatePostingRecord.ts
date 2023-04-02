import { pool } from "@/database/databaseConfiguration";
import { jobPostingsTable } from "@/database/dbConstants";

export default async function updateJobPostingRecord(
  jobPostingId: string,
  jobDescriptionText: string,
) {
  await pool.query(
    `
      UPDATE ${jobPostingsTable}
      SET 
        job_description = $1, 
        verified = true
      WHERE 
        posting_id = $2
    `,
    [jobDescriptionText, jobPostingId],
  );
}
