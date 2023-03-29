import { pool } from "../../../db/dbConfig.js";

export async function glassdoorDBGetJobPostings(searchId) {
  const client = await pool.connect();
  try {
    const query = `
      SELECT job_postings.*, companies.company_name
      FROM job_postings
      INNER JOIN companies ON job_postings.company_id = companies.company_id
      WHERE job_postings.search_id = $1 AND  job_postings.verified = false;
    `;
    const { rows } = await client.query(query, [searchId]);
    return rows;
  } 
  finally {
    client.release();
  }
}


export async function glassdoorDBInsertJobPostings(searchId, jobPostings) {
  console.log("Starting @insertData()")
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    for (const jobPosting of jobPostings) {
      const { companyName, ...postingData } = jobPosting;
      let { rows } = await client.query(
        `
          INSERT INTO companies (company_name, search_id)
          VALUES ($1, $2)
          ON CONFLICT (company_name, search_id) DO UPDATE SET company_name = EXCLUDED.company_name
          RETURNING company_id
        `,
        [companyName, searchId]
      );
      const companyId = rows[0].company_id;
      await client.query(
        `
          INSERT INTO job_postings (role_name, role_location, salary_range, posting_url, date_posted, company_id, search_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
        [
          postingData.roleName,
          postingData.roleLocation,
          postingData.salaryRange,
          postingData.jobPostingURL,
          postingData.datePosted,
          companyId,
          searchId,
        ]
      );
    }
    console.log("Completed @insertData()")
    await client.query("COMMIT");
  }
  catch (e) {
    await client.query("ROLLBACK");
    console.log("-- ERROR in GLASSDOOR @insertData() --", error)
    throw e;
  }
  finally {
    client.release();
    console.log("Successful Write.")
  }
}