import express from "express";
import { resetTables } from "../db/testTables.js";
import getGlassdoorJobPostingsDetailedData from "../searches/Glassdoor/scripts/getGlassdoorJobPostingsDetailedData.js";

const testRouter = express.Router();

testRouter.get("/reset-db", async (req, res) => {
  try {
    await resetTables()
    res.send("Tables reset successfully");
  } 
  catch (e) {
    console.error("Error resetting tables:", e);
    res.status(500).send("Error resetting tables");
  }
});

testRouter.post("/postings-detailed", async (req, res) => {
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

testRouter.get("/airtable", async (_, res) => {
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

export default testRouter;