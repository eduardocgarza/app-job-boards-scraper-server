import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { pool } from "../../database/databaseConfiguration";
const { AIRTABLE_TOKEN, AIRTABLE_FL_BASE_ID } = process.env;

const BASE_URL = "https://api.airtable.com/v0";

/**
 * Airtable Workflow
 *
 * 1. Get Job Postings + Companies, Round 1
 * 2. Store them as Jobs Table -- To select the relevant jobs
 *
 * 3. Use the CLIENT to go to the next step
 * 4. The Bad Leads and Duplicates and removed
 * 5. Decision-makers are collected using Snovio/Apollo API
 * 6. Store them as a Decision-Makers Table -- To select relevant people
 *
 * 4. Use the CLIENT to go to the next step
 * 5. The Bad Leads are removed
 * 5. Decision-makers kept are data-enriched
 * 6. Personalized sequences are created for each contact
 * 7. Segment the leads into different campaigns based on Lead Type/Rank
 * 8. Store them as a final Table -- To qualify leads
 *
 * 9. Use CLIENT to have leads ready for download as a CSV/XLS,
 *  or to import directly to the outbound system or Hubspot (API).
 * 10. Leads are "Qualified" and ready for manual/automated outreach
 *
 * 11. TODO -- Find an analytics tracking software that can connect
 *  to Instantly or see if Instantly can create analytics views
 *  based on some "Column ID"
 *
 */

// const baseId = "YOUR_BASE_ID";
// const tableName = "YOUR_TABLE_NAME";
// const endpointUrl = `${baseUrl}${baseId}/${tableName}`;

export async function addJobPostingsToAirtable(tableName, tableDescription, jobPostings) {
  const createTableURL = `${BASE_URL}/meta/bases/${AIRTABLE_FL_BASE_ID}/tables`;
  const fields = [
    {
      name: "Posting ID",
      description: "",
      type: "singleLineText",
    },
    {
      name: "Role Name",
      description: "",
      type: "singleLineText",
    },
    {
      name: "Role Location",
      description: "",
      type: "singleLineText",
    },
    {
      name: "Salary Range",
      description: "",
      type: "singleLineText",
    },
    {
      name: "Job Posting URL",
      description: "",
      type: "url",
    },
    {
      name: "Date Posted",
      description: "",
      type: "date",
      options: {
        dateFormat: {
          format: "M/D/YYYY",
          name: "us",
        },
      },
    },
    {
      name: "Company ID",
      description: "",
      type: "singleLineText",
    },
  ];

  const payload = {
    name: tableName,
    description: tableDescription,
    fields,
  };
  const options = {
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(createTableURL, payload, options);
  const data = response.data;
  const { id, name, primaryFieldId } = data;
  console.log(`Created table ${name} with ID ${id} and primary field ID ${primaryFieldId}!`);
  // console.log(`Added ${response.data.records.length} job postings to Airtable`);
}

function createJobPostingLists(jobPostings) {
  const lists = [];
  const batchSize = 10;
  for (let index = 0; index < jobPostings.length; index += batchSize) {
    lists.push(jobPostings.slice(index, index + batchSize));
  }
  return lists;
}

export async function addRecordsToTable(jobPostings) {
  // https://api.airtable.com/v0/{baseId}/{tableIdOrName}
  const tableId = "tblDbkfsbmdMVUALa";
  const primaryFieldId = "fldjjiGvAFDvxLegW";
  const addRecordsURL = `${BASE_URL}/${AIRTABLE_FL_BASE_ID}/${tableId}`;
  console.log("addRecordsURL", addRecordsURL);

  const jobPostingLists = createJobPostingLists(jobPostings);
  for (const list of jobPostingLists) {
    console.log("-- Loop");
    const jobPostingRecords = list.map((v) => ({
      fields: {
        "Posting ID": String(v.postingId),
        "Role Name": v.roleName,
        "Role Location": v.roleLocation,
        "Salary Range": v.salaryRange,
        "Job Posting URL": v.jobPostingURL,
        // "Date Posted": v.datePosted,
        "Date Posted": "05-01-2021",
        "Company ID": String(v.companyId),
      },
    }));

    const payload = { records: jobPostingRecords };
    const options = {
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(addRecordsURL, payload, options);
    const data = response.data;
    console.log(`Added ${data} job postings to Airtable`);
    console.log("-- Success");
  }
}

export async function getJobPostings(tableName, tableDescription) {
  const client = await pool.connect();

  const { rows } = await client.query("SELECT * FROM job_postings");
  const jobPostings = rows.map((rowItem) => {
    const {
      posting_id,
      role_name,
      role_location,
      salary_range,
      posting_url,
      date_posted,
      company_id,
    } = rowItem;
    return {
      postingId: posting_id,
      roleName: role_name,
      roleLocation: role_location,
      salaryRange: salary_range,
      jobPostingURL: posting_url,
      datePosted: date_posted,
      companyId: company_id,
    };
  });

  // await addJobPostingsToAirtable(tableName, tableDescription, jobPostings)
  return jobPostings;
}

async function createVerificationCompaniesTable() {}

export async function createVerificationTable(tableName, tableDescription) {
  await getJobPostings(tableName, tableDescription);
  await createVerificationCompaniesTable();
}

const url = `${BASE_URL}/meta/bases`;
const config = {
  headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
};

async function createTable(tableName) {}

const WORKSPACE_ID = "wspoKQFIFYFeH5eD1";

async function createBase(baseName) {
  const url = "https://api.airtable.com/v0/meta/bases";

  const newTables = [
    {
      name: "Table Name",
      description: "Optional Table Description",
      // FieldConfig[]
      fields: [],
    },
  ];

  const body = {
    name: baseName,
    workspaceId: WORKSPACE_ID,
    tables: newTables,
  };
  const response = await axios.post(url, body, config);
  console.log("Response: ", response);
}

(async function Main() {
  const baseId = "appzgkk31i7oIWS5l";

  await createBase("Gay Frogs");

  try {
    // var bases = await axios.get(endpointUrl, config);
    // console.log(bases.data);
    // var schemas = await axios.get(`https://api.airtable.com/v0/meta/bases/${baseId}/tables`, config)
    // console.log(JSON.stringify(schemas.data))
  } catch (error) {
    console.log(error);
  }
});

export async function fetchAirtableRecords() {
  let offset = null;
  let records = [];

  // https://api.airtable.com/v0/{baseId}/{tableIdOrName}
  const tableId = "tblDbkfsbmdMVUALa";
  let fetchRecordsURL = `${BASE_URL}/${AIRTABLE_FL_BASE_ID}/${tableId}`;

  do {
    if (offset) fetchRecordsURL += `?offset=${offset}`;
    const response = await axios.get(fetchRecordsURL, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      },
    });

    records = records.concat(response.data.records);
    offset = response.data.offset;
  } while (offset);

  return records;
}
