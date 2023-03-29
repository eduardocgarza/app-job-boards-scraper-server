import { Request, Response } from "express";

export default async function createAirtableHandler(req: Request, res: Response) {
  const tableName = "Test Table on API";
  const tableDescription =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget aliquam tincidunt, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.";

  /** @test1 -- create table */
  // await createVerificationTable(tableName, tableDescription)

  /**
   * @test2 -- add records to table
   */
  // const jobPostings = await getJobPostings()
  // await addRecordsToTable(jobPostings)

  /** @test3 -- X */
  // const records = await fetchAirtableRecords()
  // const records = await fetchAirtableRecords();
  const records = [1];
  console.log("records", records);
  console.log("---");
  console.log("records[0]", records[0]);

  return res.send("Added Job Postings to Airtable");
}
