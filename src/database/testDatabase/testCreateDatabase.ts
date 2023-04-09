import { pool } from "../databaseConfiguration";
import populateDatabase from "./testPopulateDatabase/testPopulateDatabase";
import testDataJobPostings from "./data/testDataJobPostings";
import {
  createCompaniesTableQuery,
  createJobPostingsTableQuery,
  createPeopleSequencesTableQuery,
  createPeopleTableQuery,
  createSearchCompaniesTableQuery,
  createSearchPostingsTableQuery,
  createSearchesTableQuery,
  createTeamsTableQuery,
} from "./queries/createTablesQueries";
import {
  deleteCompaniesQuery,
  deleteJobPostingsQuery,
  deletePeopleSequencesTable,
  deletePeopleTable,
  deleteSearchCompaniesQuery,
  deleteSearchPostingsQuery,
  deleteSearchesQuery,
  deleteTeamsQuery,
  dropCompaniesQuery,
  dropJobPostingsQuery,
  dropPeopleSequencesTable,
  dropPeopleTable,
  dropSearchCompaniesQuery,
  dropSearchPostingsQuery,
  dropSearchesQuery,
  dropTeamsQuery,
} from "./queries/dropTablesQueries";

async function createTables() {
  const client = await pool.connect();
  await client.query(createSearchesTableQuery);
  await client.query(createCompaniesTableQuery);
  await client.query(createTeamsTableQuery);
  await client.query(createJobPostingsTableQuery);
  await client.query(createSearchPostingsTableQuery);
  await client.query(createSearchCompaniesTableQuery);
  await client.query(createPeopleTableQuery);
  await client.query(createPeopleSequencesTableQuery);
  client.release();
}

async function dropTables() {
  const client = await pool.connect();
  await client.query(dropSearchCompaniesQuery);
  await client.query(dropSearchPostingsQuery);
  await client.query(dropTeamsQuery);
  await client.query(dropJobPostingsQuery);
  await client.query(dropCompaniesQuery);
  await client.query(dropSearchesQuery);
  await client.query(dropPeopleTable);
  await client.query(dropPeopleSequencesTable);
  client.release();
}

export async function clearTables() {
  const client = await pool.connect();
  await client.query(deleteSearchCompaniesQuery);
  await client.query(deleteSearchPostingsQuery);
  await client.query(deleteJobPostingsQuery);
  await client.query(deleteCompaniesQuery);
  await client.query(deleteTeamsQuery);
  await client.query(deleteSearchesQuery);
  await client.query(deletePeopleTable);
  await client.query(deletePeopleSequencesTable);
  client.release();
}

export async function resetTables() {
  try {
    await dropTables();
    await createTables();
    // await populateDatabase(testDataJobPostings);
    console.log("Tables reset successfully");
  } catch (e) {
    console.error("Error resetting tables:", e);
    throw e;
  }
}
