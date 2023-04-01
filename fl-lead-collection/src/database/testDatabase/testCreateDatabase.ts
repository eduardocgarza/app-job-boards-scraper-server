import { pool } from "../databaseConfiguration";
import populateDatabase from "./testPopulateDatabase/testPopulateDatabase";
import testDataJobPostings from "./data/testDataJobPostings";
import {
  createCompaniesTableQuery,
  createJobPostingsTableQuery,
  createSearchCompaniesTableQuery,
  createSearchPostingsTableQuery,
  createSearchesTableQuery,
  createTeamsTableQuery,
} from "./queries/createTablesQueries";
import {
  deleteCompaniesQuery,
  deleteJobPostingsQuery,
  deleteSearchCompaniesQuery,
  deleteSearchPostingsQuery,
  deleteSearchesQuery,
  deleteTeamsQuery,
  dropCompaniesQuery,
  dropJobPostingsQuery,
  dropSearchCompaniesQuery,
  dropSearchPostingsQuery,
  dropSearchesQuery,
  dropTeamsQuery,
} from "./queries/dropTablesQueries";

async function createTables() {
  await pool.query(createSearchesTableQuery);
  await pool.query(createCompaniesTableQuery);
  await pool.query(createTeamsTableQuery);
  await pool.query(createJobPostingsTableQuery);
  await pool.query(createSearchPostingsTableQuery);
  await pool.query(createSearchCompaniesTableQuery);
}

async function dropTables() {
  await pool.query(dropSearchCompaniesQuery);
  await pool.query(dropSearchPostingsQuery);
  await pool.query(dropTeamsQuery);
  await pool.query(dropJobPostingsQuery);
  await pool.query(dropCompaniesQuery);
  await pool.query(dropSearchesQuery);
}

export async function clearTables() {
  await pool.query(deleteSearchCompaniesQuery);
  await pool.query(deleteSearchPostingsQuery);
  await pool.query(deleteJobPostingsQuery);
  await pool.query(deleteCompaniesQuery);
  await pool.query(deleteTeamsQuery);
  await pool.query(deleteSearchesQuery);
}

export async function resetTables() {
  try {
    await dropTables();
    await createTables();
    await populateDatabase(testDataJobPostings);
    console.log("Tables reset successfully");
  } catch (e) {
    console.error("Error resetting tables:", e);
    throw e;
  }
}
