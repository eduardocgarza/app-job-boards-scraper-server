import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import pg from "pg"
import fs from "fs"
const { Pool } = pg

import execGlassdoorSearch from "./searches/Glassdoor/scripts/glassdoorSearch.js"
import execIndeedSearch from "./searches/Indeed/indeedSearch.js"
import execLinkedinSearch from "./searches/Linkedin/linkedinSearch.js"
import execMonsterSearch from "./searches/Monster/monsterSearch.js"
import execZipRecruiterSearch from "./searches/ZipRecruiter/zipRecruiterSearch.js"
import { LOCATIONS, ROLES } from "./searches/Glassdoor/scripts/glassdoorConstants.js"
import { addJobPostingsToAirtable, addRecordsToTable, createVerificationTable, getJobPostings, getRecords } from "./integrations/airtable/airtable.js"

const SERVER_PORT = 5000

export const pool = new Pool({
  user: "florianlaurent",
  host: "localhost",
  database: "florianlaurent",
  password: "florianlaurent",
  port: 5432,
})

const app = express()

app.use(express.json())
app.use(cors())

async function createTables() {
  const createCompaniesTable = `
    CREATE TABLE IF NOT EXISTS companies (
      company_id SERIAL PRIMARY KEY,
      company_name TEXT UNIQUE NOT NULL
    );
  `;

  const createJobPostingsTable = `
    CREATE TABLE IF NOT EXISTS job_postings (
      posting_id SERIAL PRIMARY KEY,
      role_name TEXT NOT NULL,
      role_location TEXT NOT NULL,
      salary_range TEXT,
      posting_url TEXT NOT NULL,
      date_posted TEXT,
      company_id INTEGER REFERENCES companies(company_id)
    );
  `;

  await pool.query(createCompaniesTable);
  await pool.query(createJobPostingsTable);
}

async function dropTables() {
  const dropJobPostingsTable = `DROP TABLE IF EXISTS job_postings;`;
  const dropCompaniesTable = `DROP TABLE IF EXISTS companies;`;
  await pool.query(dropJobPostingsTable);
  await pool.query(dropCompaniesTable);
}

async function clearTables() {
  const clearJobPostingsTable = `DELETE FROM job_postings;`;
  const clearCompaniesTable = `DELETE FROM companies;`;
  await pool.query(clearJobPostingsTable);
  await pool.query(clearCompaniesTable);
}


function generateRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

export async function insertData(jobPostings) {
  console.log("Starting @insertData()")
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    for (const jobPosting of jobPostings) {
      const { companyName, ...postingData } = jobPosting;
      let { rows } = await client.query(
        `
          INSERT INTO companies (company_name)
          VALUES ($1)
          ON CONFLICT (company_name) DO UPDATE SET company_name = EXCLUDED.company_name
          RETURNING company_id
        `,
        [companyName]
      );
      const companyId = rows[0].company_id;
      await client.query(
        `
          INSERT INTO job_postings (role_name, role_location, salary_range, posting_url, date_posted, company_id)
          VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [
          postingData.roleName,
          postingData.roleLocation,
          postingData.salaryRange,
          postingData.jobPostingURL,
          postingData.datePosted,
          companyId,
        ]
      );
    }
    console.log("Completed @insertData()")
    await client.query("COMMIT");
  }
  catch (e) {
    await client.query("ROLLBACK");
    throw e;
  }
  finally {
    client.release();
    console.log("Successful Write.")
  }
}

;(async () => {
  console.log("Test Function")

  try {
    // await pool.connect()
    // await createTables()
    // await clearTables()
    // console.log("Cleared Table")
    // const res = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'");
    // console.log("Response:", res.rows)

    // const rawData = fs.readFileSync("./src/searches/Glassdoor/test/example-jobPostings.json") 
    // const jobPostings = JSON.parse(rawData)
    // await insertData(jobPostings)
    // await createVerificationTable()


    // await pool.end()
  }
  catch (error) {
    console.log("Error: ", error)
  }


})()

app.get("/test/airtable", async (_, res) => {
  var tableName = "Test Table on API"
  var tableDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget aliquam tincidunt, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl."

  /** @test1 -- create table */
  // await createVerificationTable(tableName, tableDescription)

  /**
   * @test2 -- add records to table
   */
  // const jobPostings = await getJobPostings()
  // await addRecordsToTable(jobPostings)

  /** @test3 -- X */
  const records = await getRecords()
  console.log("records", records)
  console.log("---")
  console.log("records[0]", records[0])



  
  return res.send("Added Job Postings to Airtable")
})

app.get("/clear", async (_, res) => {
  await clearTables()
  return res.send("Cleared Tables")
})

app.get("/roles", async (_, res) => {
  console.log(":: In Roles")
  return res.json(ROLES)
})

app.get("/locations", async (_, res) => {
  console.log(":: In Locations")
  return res.json(LOCATIONS)
})

app.post("/search", async (req, res) => {
  const locationName = req.body.locationName
  if (!locationName) {
    console.log("Failed!")
    return res.status(400).send("@locationName is required.")
  }

  console.log("Sending back searchId")
  res.json({ searchId: generateRandomString() })

  await execGlassdoorSearch(locationName)
  await execIndeedSearch(locationName)
  await execLinkedinSearch(locationName)
  await execMonsterSearch(locationName)
  await execZipRecruiterSearch(locationName)
})

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}...`)

})