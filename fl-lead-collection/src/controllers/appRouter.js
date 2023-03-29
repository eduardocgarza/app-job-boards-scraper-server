import express from "express"
import Joi from "joi";
const appRouter = express.Router();
import { fetchAirtableRecords } from "../integrations/airtable/airtable.js"
import { LOCATIONS, SEARCH_ROLES } from "../searches/Glassdoor/scripts/glassdoorConstants.js";
import { pool } from "../db/dbConfig.js";
import { clearTables, createSearchRecord, resetTables } from "../db/testTables.js";
import execIndeedSearch from "../searches/Indeed/indeedSearch.js";
import executeGlassdoorSearch from "../searches/Glassdoor/scripts/executeGlassdoorSearch.js";
import execLinkedinSearch from "../searches/Linkedin/linkedinSearch.js";
import execMonsterSearch from "../searches/Monster/monsterSearch.js";
import execZipRecruiterSearch from "../searches/ZipRecruiter/zipRecruiterSearch.js";
import getGlassdoorJobPostingsDetailedData from "../searches/Glassdoor/scripts/getGlassdoorJobPostingsDetailedData.js";

appRouter.get("/test/reset-db", async (req, res) => {
  try {
    await resetTables()
    res.send("Tables reset successfully");
  } 
  catch (e) {
    console.error("Error resetting tables:", e);
    res.status(500).send("Error resetting tables");
  }
});

/** @START -- Current Testing */
appRouter.post("/test/postings-detailed", async (req, res) => {
  const { searchId } = req.body;
  try {
    const jobPostings = await getGlassdoorJobPostingsDetailedData({ searchId });
    res.status(200).send(jobPostings);
  } 
  catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

/** @END -- Current Testing */













appRouter.get("/test/airtable", async (_, res) => {
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
  // const records = await fetchAirtableRecords()
  const records = await fetchAirtableRecords()
  console.log("records", records)
  console.log("---")
  console.log("records[0]", records[0])

  return res.send("Added Job Postings to Airtable")
})

appRouter.get("/clear", async (_, res) => {
  await clearTables()
  return res.send("Cleared Tables")
})

appRouter.get("/roles", async (_, res) => {
  console.log(":: In Roles")
  return res.json(SEARCH_ROLES)
})

appRouter.get("/locations", async (_, res) => {
  console.log(":: In Locations")
  return res.json(LOCATIONS)
})

const searchSchema = Joi.object({
  campaignName: Joi.string().required(),
  campaignDescription: Joi.string().required(),
  locationName: Joi.string().required(),
  roles: Joi.array().items(Joi.string()).required(),
  platforms: Joi.array().items(Joi.string()).required(),
});

async function executeSearch(searchObject) {
  const { platforms } = searchObject
  if (platforms.includes("Glassdoor")) {
    console.log("Starting @executeGlassdoorSearch")
    await executeGlassdoorSearch(searchObject)
    console.log(":: Completed @executeGlassdoorSearch")
  }
  if (platforms.includes("Indeed")) {
    await execIndeedSearch(searchObject)
  }
  if (platforms.includes("Linkedin")) {
    await execLinkedinSearch(searchObject)
  }
  if (platforms.includes("Monster")) {
    await execMonsterSearch(searchObject)
  }
  if (platforms.includes("ZipRecruiter")) {
    await execZipRecruiterSearch(searchObject)
  }
}

const { AIRTABLE_TOKEN, AIRTABLE_FL_BASE_ID } = process.env;
const BASE_URL = "https://api.airtable.com/v0";

const RAW_DATA_POSTS_PAGE_FIELDS = [
  {
    name: "Job Posting ID",
    description: "The unique identifier for each job posting",
    type: "singleLineText"
  },
  {
    name: "Role Name",
    description: "The name of the job position",
    type: "singleLineText"
  },
  {
    name: "Role Location",
    description: "The location of the job position",
    type: "singleLineText"
  },
  {
    name: "Salary Range",
    description: "The range of salary offered for the job position",
    type: "singleLineText"
  },
  {
    name: "Job Posting URL",
    description: "The URL to the job posting page",
    type: "url"
  },
  {
    name: "Date Posted",
    description: "The date when the job posting was posted",
    type: "date",
    options: {
      dateFormat: {
        format: "M/D/YYYY",
        name: "us"
      }
    }
  },
  {
    name: "Company ID",
    description: "The unique identifier for the company of the job posting",
    type: "singleLineText"
  },
  {
    name: "Company Name",
    description: "The name of the company of the job posting",
    type: "singleLineText"
  },
  {
    name: "Company URL",
    description: "The URL to the company profile page",
    type: "url"
  },
  {
    name: "Headquarters Location",
    description: "The location of the company headquarters",
    type: "singleLineText"
  },
  {
    name: "Number of Company Job Postings",
    description: "The number of job postings from the company",
    type: "number"
  },
];


const RAW_DATA_COMPANIES_PAGE_FIELDS = [
  {
    name: "Company ID",
    description: "The unique identifier for the company of the job posting",
    type: "singleLineText"
  },
  {
    name: "Company Name",
    description: "The name of the company of the job posting",
    type: "singleLineText"
  },
  {
    name: "Company URL",
    description: "The URL to the company profile page",
    type: "url"
  },
  {
    name: "Headquarters Location",
    description: "The location of the company headquarters",
    type: "singleLineText"
  },
  {
    name: "Number of Company Job Postings",
    description: "The number of job postings from the company",
    type: "number"
  },
  {
    name: "Date of Most Recent Job Posting",
    description: "The date of the most recent job posting from the company",
    type: "date",
    options: {
      dateFormat: {
        format: "M/D/YYYY",
        name: "us"
      }
    }
  },
]

async function createRawDataJobPostingsAirtable(searchId, jobPostings) {
  const createTableURL = `${BASE_URL}/meta/bases/${AIRTABLE_FL_BASE_ID}/tables`
  const tableName = ""
  const tableDescription = ""
  const payload = {
    name: tableName,
    description: tableDescription,
    fields: RAW_DATA_POSTS_PAGE_FIELDS,
  }
  const options = {
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(payload),
  }
  const response = await fetch(createTableURL, options)
  const data = await response.json()
  // const { id: tableId } = data

  // How to return the table URL?
  // const tableURL = `https://airtable.com/${tableId}/viw${tableId}`
  // https://airtable.com/${baseId}/tblDbkfsbmdMVUALa/viwGCmXz3qCqdClzp
  const baseId = "appMSWraP1Ejfz2O0"
  const tableId = "tblDbkfsbmdMVUALa"
  const tableURL = `https://airtable.com/${baseId}/${tableId}`

}

async function createRawDataAirtables(searchId) {
  // Get job postings that are verified for this searchId
  const { rows: jobPostings } = await pool.query(`
      SELECT job_postings.*, companies.company_name
      FROM job_postings
      INNER JOIN companies ON job_postings.company_id = companies.company_id
      WHERE job_postings.search_id = $1 AND job_postings.verified = true;
    `, [searchId]);
  await createRawDataJobPostingsAirtable(searchId, jobPostings)
}

appRouter.post("/search", async (req, res) => {
  const { error } = searchSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const searchId = await createSearchRecord(req.body);
  console.log("Created search record", searchId)
  res.status(201).json({ searchId });

  const searchObject = {
    searchId: req.body.searchId,
    campaignName: req.body.campaignName,
    campaignDescription: req.body.campaignDescription,
    locationName: req.body.locationName,
    roles: req.body.roles,
    platforms: req.body.platforms,
  }
  await executeSearch(searchObject)
  console.log("Search complete")
  return
  await createRawDataAirtables(searchId)

  // Update progress table
  // --- 
})

export default appRouter;