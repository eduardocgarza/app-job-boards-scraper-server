import { pool } from "../../../db/dbConfig";
import { createCompanyRecords, createJobPostingRecords, createSearchCompanyRecord, createSearchPostingRecord, getUniqueCompaniesByName } from "../../../db/test/dbTestPopulate";

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

export async function insertPostingsData(searchId, jobPostings) {
  // orderId: 13 {
  //   companyName: 'British Columbia Utilities Commission',
  //   roleName: 'Webmaster - Communications/Information Technology',
  //   roleLocation: 'Vancouver',
  //   salaryRange: 'CA$69K - CA$114K ',
  //   jobPostingURL: 'https://www.glassdoor.com/partner/jobListing.htm?pos=201&ao=1136043&s=58&guid=000001872c0966d089e20739690b5ad9&src=GD_JOB_AD&t=SR&vt=w&ea=1&cs=1_c82b3169&cb=1680071026576&jobListingId=1008526008144&jrtk=3-0-1gsm0ipnjg2oi801-1gsm0ipo7pke2800-7591e8ccdefbd9b5-',
  //   glassdoorJobPostingId: '1008526008144',
  //   companyRating: '4.6',
  //   easyApply: true,
  //   datePosted: '15d'
  // }

  const client = await pool.connect();
  // 1. Get unique companies
  // 2. Store unique companies and return their company_id's
  // { [companyName]: companyId] }
  // 3. Associate the company_id's with the job postings
  try {
    await client.query("BEGIN");
    console.log(">> Started: @createCompanyRecords");
    // Returns a hashmap of { [companyName]: companyId] }
    const companiesHashMap = await createCompanyRecords(jobPostings);

    // 4. Store the job postings
    console.log(">> Started: @createJobPostingRecords");
    const updatedPostings = await createJobPostingRecords(jobPostings, companiesHashMap);
    console.log(">> Completed: @createJobPostingRecords");






    // 5. Associate the job postings with the search_id
    console.log("--Started: $createSearchPostingRecord: ", searchId);
    await createSearchPostingRecord(searchId, updatedPostings);
    console.log("--Finished: $createSearchPostingRecord");










    // 6. Associate the job postings with the company_id
    console.log("--Started: $createSearchCompanyRecord");
    await createSearchCompanyRecord(searchId, updatedPostings);
    console.log("--Finished: $createSearchCompanyRecord");













    await client.query("COMMIT");
  }
  catch (e) {
    await client.query("ROLLBACK");
    console.log("-- ERROR in GLASSDOOR @insertData() --", e);
    throw e;
  }
  finally {
    client.release();
    console.log("Successful Write.");
  }
}