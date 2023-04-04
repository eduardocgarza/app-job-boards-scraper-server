import { IPreStoreJobPosting } from "@/types/appInterfaces";
import { pool } from "../databaseConfiguration";
import postingConverterOut from "../databaseDataConverters/postingConverterOut";
import { jobPostingsTable } from "../dbConstants";

type TPostingsValues = Array<string | number>[];
function createValuesMap(values: TPostingsValues) {
  return values
    .map(
      (_, i) =>
        `($${9 * i + 1}, $${9 * i + 2}, $${9 * i + 3}, $${9 * i + 4}, $${9 * i + 5}, $${
          9 * i + 6
        }, $${9 * i + 7}, $${9 * i + 8}, $${9 * i + 9})`,
    )
    .join(",");
}

export default async function insertPostings(postings: IPreStoreJobPosting[]) {
  const values: TPostingsValues = postings.map((posting) => [
    posting.roleName,
    posting.roleLocation,
    posting.salaryRange,
    posting.postingURL,
    posting.datePosted,
    posting.companyId,
    posting.teamId,
    posting.glassdoorPostingId,
    "Glassdoor",
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
      glassdoor_posting_id,
      platform
    )
    VALUES ${createValuesMap(values)}
    ON CONFLICT (glassdoor_posting_id)
    DO NOTHING
    RETURNING *;
  `;
  const { rows } = await pool.query(query, values.flat());
  return rows.map(postingConverterOut);
}
