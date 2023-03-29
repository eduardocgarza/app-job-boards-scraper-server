// import { fetchAirtableRecords } from "@/integrations/airtable/airtable";
// import { AIRTABLE_BASE_URL, RAW_DATA_POSTS_PAGE_FIELDS } from "@/integrations/airtable/airtableConstants";

// const { AIRTABLE_TOKEN, AIRTABLE_FL_BASE_ID } = process.env;

// async function createRawDataJobPostingsAirtable(searchId, jobPostings) {
//   const createTableURL = `${AIRTABLE_BASE_URL}/meta/bases/${AIRTABLE_FL_BASE_ID}/tables`;
//   const tableName = "";
//   const tableDescription = "";
//   const payload = {
//     name: tableName,
//     description: tableDescription,
//     fields: RAW_DATA_POSTS_PAGE_FIELDS,
//   };
//   const options = {
//     headers: {
//       Authorization: `Bearer ${AIRTABLE_TOKEN}`,
//       "Content-Type": "application/json",
//     },
//     method: "POST",
//     body: JSON.stringify(payload),
//   };
//   const response = await fetchAirtableRecords(createTableURL, options);
//   const data = await response.json();
//   // const { id: tableId } = data

//   // How to return the table URL?
//   // const tableURL = `https://airtable.com/${tableId}/viw${tableId}`
//   // https://airtable.com/${baseId}/tblDbkfsbmdMVUALa/viwGCmXz3qCqdClzp
//   const baseId = "appMSWraP1Ejfz2O0";
//   const tableId = "tblDbkfsbmdMVUALa";
//   const tableURL = `https://airtable.com/${baseId}/${tableId}`;
// }

// async function createRawDataAirtables(searchId) {
//   // Get job postings that are verified for this searchId
//   const { rows: jobPostings } = await pool.query(
//     `
//       SELECT job_postings.*, companies.company_name
//       FROM job_postings
//       INNER JOIN companies ON job_postings.company_id = companies.company_id
//       WHERE job_postings.search_id = $1 AND job_postings.verified = true;
//     `,
//     [searchId]
//   );
//   await createRawDataJobPostingsAirtable(searchId, jobPostings);
// }
