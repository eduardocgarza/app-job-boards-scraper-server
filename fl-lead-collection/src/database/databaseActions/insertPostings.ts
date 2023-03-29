import { IJobPosting, IPreStoreJobPosting } from "@/types/appInterfaces";
import { DB_TABLE_NAMES } from "../dbConstants";
import { pool } from "../databaseConfiguration";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertToCamelCase(obj: any): IJobPosting {
  return {
    postingId: obj.posting_id,
    jobPostingURL: obj.posting_url,
    glassdoorJobPostingId: obj.glassdoor_posting_id,
    companyId: obj.company_id,
    roleName: obj.role_name,
    roleLocation: obj.role_location,
    salaryRange: obj.salary_range,
    datePosted: obj.date_posted,
    verified: obj.verified,
    jobDescription: obj.job_description,
  };
}

type TPostingsValues = Array<string | number>[];

function createValuesMap(values: TPostingsValues) {
  return values
    .map(
      (_, i) =>
        `($${7 * i + 1}, $${7 * i + 2}, $${7 * i + 3}, $${7 * i + 4}, $${7 * i + 5}, $${
          7 * i + 6
        }, $${7 * i + 7})`,
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
    posting.glassdoorJobPostingId,
  ]);
  const query = `
    INSERT INTO ${DB_TABLE_NAMES.jobPostingsTable} 
    (
      role_name, 
      role_location, 
      salary_range, 
      posting_url, 
      date_posted, 
      company_id, 
      glassdoor_posting_id
    )
    VALUES ${createValuesMap(values)}
    ON CONFLICT 
      (glassdoor_posting_id)
    DO UPDATE SET
      role_location = excluded.role_location,
      salary_range = excluded.salary_range,
      posting_url = excluded.posting_url,
      date_posted = excluded.date_posted,
      glassdoor_posting_id = excluded.glassdoor_posting_id
    RETURNING *
  `;
  const { rows } = await pool.query(query, values.flat());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return rows.map(convertToCamelCase);
}
