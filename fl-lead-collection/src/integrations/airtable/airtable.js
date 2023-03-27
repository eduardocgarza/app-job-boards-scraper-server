// AIRTABLE_TOKEN=patoX7ptGIvsZgwx1.04563f72a1fccefdd243ed4fd101670fbada6f697fd155906bc026a40d7e6b84
require("dotenv").config();
const airtable = require("airtable");
const axios = require("axios");

const { AIRTABLE_TOKEN } = process.env;
console.log(AIRTABLE_TOKEN);

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

// const baseUrl = "https://api.airtable.com/v0/";
// const baseId = "YOUR_BASE_ID";
// const tableName = "YOUR_TABLE_NAME";
// const endpointUrl = `${baseUrl}${baseId}/${tableName}`;

const endpointUrl = "https://api.airtable.com/v0/meta/bases"

const config = {
  headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
};

async function createTable(tableName) {

}

const WORKSPACE_ID = "wspoKQFIFYFeH5eD1"

async function createBase(baseName) {
  const url = "https://api.airtable.com/v0/meta/bases"

  const newTables = [
    {
      name: "Table Name",
      description: "Optional Table Description",
      // FieldConfig[]
      fields: [],
    }
  ]
  
  const body = {
    name: baseName, 
    workspaceId: WORKSPACE_ID,
    tables: newTables,
  }
  const response = await axios.post(url, body, config)
  console.log("Response: ", response)

}

(async function Main() {
  const baseId = "appzgkk31i7oIWS5l"

  await createBase("Gay Frogs")

  try { 
    // var bases = await axios.get(endpointUrl, config);
    // console.log(bases.data);

    // var schemas = await axios.get(`https://api.airtable.com/v0/meta/bases/${baseId}/tables`, config)
    // console.log(JSON.stringify(schemas.data))
    
  }
  catch(error) {
    console.log(error);
  }
  
})()
