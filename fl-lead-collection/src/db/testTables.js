import { pool } from "./dbConfig.js";
import { DB_TABLE_NAMES } from "./dbConstants.js";
import { populateDatabase } from "./test/dbTestPopulate.js";
import { testJobPostings as jobPostings } from "./test/testJobPostings.js";

const {
  searchesTable,
  companiesTable,
  jobPostingsTable,
  searchJobPostingsTable,
  searchCompaniesTable
} = DB_TABLE_NAMES;

export async function createSearchRecord(searchObject) {
  const client = await pool.connect();
  try {
    const {
      campaignName,
      campaignDescription,
      locationName,
      roles,
      platforms
    } = searchObject;
    const query = `
    INSERT INTO ${DB_TABLE_NAMES.searchesTable} (
      campaign_name, campaign_description, location_name, roles, platforms) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *
    `;
    const values = [
      campaignName, 
      campaignDescription, 
      locationName, 
      roles, 
      platforms
    ];
    const {rows: [searchItem]} = await client.query(query, values);
    return {
      searchId: searchItem.search_id,
      campaignName: searchItem.campaign_name,
      campaignDescription: searchItem.campaign_description,
      locationName: searchItem.location_name,
      roles: searchItem.roles,
      platforms: searchItem.platforms,
      createdAt: searchItem.created_at
    }
  }
  catch (e) {
    console.error('Error creating search record:', e);
    throw e;
  }
  finally {
    client.release();
  }
}

export async function createTables() {
  const createSearchesTable = `
    CREATE TABLE IF NOT EXISTS ${DB_TABLE_NAMES.searchesTable} (
      search_id SERIAL PRIMARY KEY,
      campaign_name VARCHAR(255),
      campaign_description TEXT,
      location_name VARCHAR(255),
      roles TEXT[],
      platforms TEXT[],
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const createCompaniesTable = `
    CREATE TABLE IF NOT EXISTS ${DB_TABLE_NAMES.companiesTable} (
      company_id SERIAL PRIMARY KEY,
      company_name TEXT UNIQUE NOT NULL,
      company_username TEXT UNIQUE,
      company_profile_url TEXT,
      headquarters_location TEXT,
      verified BOOLEAN DEFAULT FALSE
    );
  `;

  const createJobPostingsTable = `
    CREATE TABLE IF NOT EXISTS ${DB_TABLE_NAMES.jobPostingsTable} (
      posting_id SERIAL PRIMARY KEY,
      glassdoor_posting_id TEXT UNIQUE NOT NULL,
      role_name TEXT NOT NULL,
      role_location TEXT NOT NULL,
      salary_range TEXT,
      posting_url TEXT NOT NULL,
      date_posted TEXT,
      verified BOOLEAN DEFAULT FALSE,
      job_description TEXT DEFAULT '',
      company_id INTEGER REFERENCES companies(company_id)
    );
  `;

  const searchPostingsTable = `
    CREATE TABLE IF NOT EXISTS ${DB_TABLE_NAMES.searchJobPostingsTable} (
      search_id INTEGER REFERENCES searches(search_id),
      posting_id INTEGER REFERENCES job_postings(posting_id),
      PRIMARY KEY(search_id, posting_id)
    );
  `
  const searchCompaniesTable = `
    CREATE TABLE IF NOT EXISTS ${DB_TABLE_NAMES.searchCompaniesTable} (
      search_id INTEGER REFERENCES searches(search_id),
      company_id INTEGER REFERENCES companies(company_id),
      PRIMARY KEY(search_id, company_id)
    );
  `
  await pool.query(createSearchesTable);
  await pool.query(createCompaniesTable);
  await pool.query(createJobPostingsTable);
  await pool.query(searchPostingsTable);
  await pool.query(searchCompaniesTable);
}

export async function dropTables() {
  const searchCompaniesQuery = `DROP TABLE IF EXISTS ${searchCompaniesTable};`;
  const searchPostingsQuery = `DROP TABLE IF EXISTS ${searchJobPostingsTable};`;
  const jobPostingsQuery = `DROP TABLE IF EXISTS ${jobPostingsTable};`;
  const companiesQuery = `DROP TABLE IF EXISTS ${companiesTable};`;
  const searchesQuery = `DROP TABLE IF EXISTS ${searchesTable};`;
  await pool.query(searchCompaniesQuery);
  await pool.query(searchPostingsQuery);
  await pool.query(jobPostingsQuery);
  await pool.query(companiesQuery);
  await pool.query(searchesQuery);
}

export async function clearTables() {
  const { searchesTable, companiesTable, jobPostingsTable, searchJobPostingsTable, searchCompaniesTable } = DB_TABLE_NAMES;
  const searchCompaniesQuery = `DELETE FROM ${searchCompaniesTable};`;
  const searchPostingsQuery = `DELETE FROM ${searchJobPostingsTable};`;
  const jobPostingsQuery = `DELETE FROM ${jobPostingsTable};`;
  const companiesQuery = `DELETE FROM ${companiesTable};`;
  const searchesQuery = `DELETE FROM ${searchesTable};`;
  await pool.query(searchCompaniesQuery);
  await pool.query(searchPostingsQuery);
  await pool.query(jobPostingsQuery);
  await pool.query(companiesQuery);
  await pool.query(searchesQuery);
}

export async function resetTables() {
  try {
    await dropTables();
    await createTables();
    await populateDatabase(jobPostings);
    console.log('Tables reset successfully');
  }
  catch (e) {
    console.error('Error resetting tables:', e);
    throw e;
  }
}
