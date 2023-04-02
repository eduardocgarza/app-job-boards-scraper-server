import { IPreStoreJobPosting } from "@/types/appInterfaces";
import { pool } from "../databaseConfiguration";
import postingsToCamelCase from "../databaseDataConverters/postingsToCamelCase";
import { jobPostingsTable } from "../dbConstants";

type TPostingsValues = Array<string | number>[];
function createValuesMap(values: TPostingsValues) {
  return values
    .map(
      (_, i) =>
        `($${8 * i + 1}, $${8 * i + 2}, $${8 * i + 3}, $${8 * i + 4}, $${8 * i + 5}, $${
          8 * i + 6
        }, $${8 * i + 7}, $${8 * i + 8})`,
    )
    .join(",");
}

export default async function insertPostings(postings: IPreStoreJobPosting[]) {
  const values: TPostingsValues = postings.map((posting) => [
    posting.roleName,
    posting.roleLocation,
    posting.salaryRange,
    posting.jobPostingURL,
    posting.datePosted,
    posting.companyId,
    posting.teamId,
    posting.glassdoorJobPostingId,
  ]);
  const query = `
    INSERT INTO ${jobPostingsTable} 
    (
      role_name, 
      role_location, 
      salary_range, 
      posting_url, 
      date_posted, 
      company_id,
      team_id,
      glassdoor_posting_id
    )
    VALUES ${createValuesMap(values)}
    ON CONFLICT 
      (glassdoor_posting_id)
    DO UPDATE SET
      role_name = excluded.role_name,
      role_location = excluded.role_location,
      salary_range = excluded.salary_range,
      posting_url = excluded.posting_url,
      date_posted = excluded.date_posted,
      company_id = excluded.company_id,
      team_id = excluded.team_id,
      glassdoor_posting_id = excluded.glassdoor_posting_id
    RETURNING *
  `;
  const { rows } = await pool.query(query, values.flat());
  return rows.map(postingsToCamelCase);
}
