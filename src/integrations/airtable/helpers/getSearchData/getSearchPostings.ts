import { PoolClient } from "pg";
import { IPreStoreSearchPostingAirtable } from "../../config/airtableInterfaces";
import {
  companiesTable,
  jobPostingsTable,
  searchJobPostingsTable,
  teamsTable,
} from "@/database/dbConstants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatPostings(postings: any[]) {
  return postings.map((posting) => {
    return {
      jobPostingId: posting.posting_id,
      glassdoorJobPostingId: posting.glassdoor_posting_id,
      roleName: posting.role_name,
      roleLocation: posting.role_location,
      salaryRange: posting.salary_range,
      jobPostingURL: posting.posting_url,
      datePosted: posting.date_posted,
      companyId: posting.company_id,
      companyName: posting.company_name,
      companyUsername: posting.company_username,
      companyProfileURL: posting.company_profile_url,
      headquartersLocation: posting.headquarters_location,
      teamId: posting.team_id,
      teamName: posting.team_name,
      numPostings: posting.numPostings,
      numTeams: posting.numTeams,
      latestPostingDate: posting.latestPostingDate,
    };
  });
}

export default async function getSearchPostings(
  client: PoolClient,
  searchId: string,
): Promise<IPreStoreSearchPostingAirtable[]> {
  const jobPostingsQuery = `
    SELECT
      jp.*,
      c.company_name,
      c.company_username,
      c.company_profile_url,
      c.headquarters_location,
      t.team_name,
      COUNT(jp.posting_id) OVER 
        (PARTITION BY c.company_id) AS "numPostings",
      COUNT(jp.team_id) OVER 
        (PARTITION BY c.company_id) AS "numTeams",
      MAX(jp.date_posted) OVER 
        (PARTITION BY c.company_id) AS "latestPostingDate"
    FROM ${jobPostingsTable} AS jp
    JOIN ${companiesTable} AS c
      ON jp.company_id = c.company_id
    JOIN ${teamsTable} AS t
      ON jp.team_id = t.team_id
    JOIN ${searchJobPostingsTable} AS sjp
      ON jp.posting_id = sjp.posting_id
    WHERE 
      sjp.search_id = $1 AND
      jp.verified=true;
  `;
  const jobPostingsResult = await client.query(jobPostingsQuery, [searchId]);
  return formatPostings(jobPostingsResult.rows);
}
