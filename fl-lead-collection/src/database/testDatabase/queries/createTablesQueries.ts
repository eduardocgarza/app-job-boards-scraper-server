import { DB_TABLE_NAMES } from "../../dbConstants";
const {
  searchCompaniesTable,
  searchJobPostingsTable,
  teamsTable,
  jobPostingsTable,
  companiesTable,
  searchesTable,
} = DB_TABLE_NAMES;

export const createSearchesTableQuery = `
  CREATE TABLE IF NOT EXISTS ${searchesTable} (
    search_id SERIAL PRIMARY KEY,
    campaign_name VARCHAR(255),
    campaign_description TEXT,
    location_name VARCHAR(255),
    roles TEXT[],
    platforms TEXT[],
    created_at TIMESTAMP DEFAULT NOW(),
    search_companies_airtable_id TEXT,  
    search_companies_airtable_primary_field_id TEXT,
    search_postings_airtable_id TEXT,
    search_postings_airtable_primary_field_id TEXT,
    people_airtable_id TEXT,
    people_airtable_primary_field_id TEXT,
    leads_airtable_id TEXT,
    leads_airtable_primary_field_id TEXT
  );
`;

export const createCompaniesTableQuery = `
  CREATE TABLE IF NOT EXISTS ${companiesTable} (
    company_id SERIAL PRIMARY KEY,
    company_name TEXT,
    company_username TEXT UNIQUE,
    company_profile_url TEXT,
    headquarters_location TEXT,
    verified BOOLEAN DEFAULT FALSE
  );
`;

export const createTeamsTableQuery = `
  CREATE TABLE IF NOT EXISTS ${teamsTable} (
    team_id SERIAL PRIMARY KEY,
    team_name TEXT UNIQUE NOT NULL,
    company_id INTEGER REFERENCES ${companiesTable} 
      (company_id)
  );
`;

export const createJobPostingsTableQuery = `
  CREATE TABLE IF NOT EXISTS ${jobPostingsTable} (
    posting_id SERIAL PRIMARY KEY,
    glassdoor_posting_id TEXT UNIQUE NOT NULL,
    role_name TEXT NOT NULL,
    role_location TEXT NOT NULL,
    salary_range TEXT,
    posting_url TEXT NOT NULL,
    date_posted TEXT,
    verified BOOLEAN DEFAULT FALSE,
    job_description TEXT DEFAULT '',
    company_id INTEGER
      REFERENCES ${companiesTable} (company_id),
    team_id INTEGER
      references ${teamsTable} (team_id)    
  );
`;

export const searchPostingsTableQuery = `
  CREATE TABLE IF NOT EXISTS ${searchJobPostingsTable} (
    search_id INTEGER REFERENCES ${searchesTable}
      (search_id),
    posting_id INTEGER REFERENCES ${jobPostingsTable}
      (posting_id),
    PRIMARY KEY(search_id, posting_id)
  );
`;

export const searchCompaniesTableQuery = `
  CREATE TABLE IF NOT EXISTS ${searchCompaniesTable} (
    search_id INTEGER REFERENCES ${searchesTable}
      (search_id),
    company_id INTEGER REFERENCES ${companiesTable}
      (company_id),
    PRIMARY KEY(search_id, company_id)
  );
`;
