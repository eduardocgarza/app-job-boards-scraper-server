import {
  peopleTable,
  searchCompaniesTable,
  searchJobPostingsTable,
  teamsTable,
  jobPostingsTable,
  companiesTable,
  searchesTable,
  peopleSequencesTable,
} from "@/database/dbConstants";

export const createSearchesTableQuery = `
  CREATE TABLE IF NOT EXISTS ${searchesTable} (
    search_id SERIAL PRIMARY KEY,
    campaign_name VARCHAR(255),
    campaign_description TEXT,
    location_name VARCHAR(255),
    roles TEXT[],
    platforms TEXT[],
    created_at TIMESTAMP DEFAULT NOW(),
    search_status_id TEXT DEFAULT 1,
    search_status_progress_percentage INTEGER DEFAULT 0,
    search_companies_airtable_id TEXT DEFAULT '', 
    search_companies_airtable_primary_field_id TEXT DEFAULT '',
    search_postings_airtable_id TEXT DEFAULT '',
    search_postings_airtable_primary_field_id TEXT DEFAULT '',
    people_airtable_id TEXT DEFAULT '',
    people_airtable_primary_field_id TEXT DEFAULT '',
    leads_airtable_id TEXT DEFAULT '',
    leads_airtable_primary_field_id TEXT DEFAULT ''
  );
`;

export const createCompaniesTableQuery = `
  CREATE TABLE IF NOT EXISTS ${companiesTable} (
    company_id SERIAL PRIMARY KEY,
    company_name TEXT,
    company_username TEXT UNIQUE,
    company_profile_url TEXT,
    headquarters_location TEXT,
    verified BOOLEAN DEFAULT FALSE,
    crunchbase_url VARCHAR(255),
    facebook_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    linkedin_uid VARCHAR(255),
    twitter_url VARCHAR(255),
    website_url VARCHAR(255),
    phones VARCHAR(255)[],
    primary_phone VARCHAR(255),
    founded_year VARCHAR(255),
    publicly_traded_symbol VARCHAR(255),
    publicly_traded_exchange VARCHAR(255),
    logo_url VARCHAR(255)
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
    platform TEXT NOT NULL,
    company_id INTEGER
      REFERENCES ${companiesTable} (company_id),
    team_id INTEGER
      REFERENCES ${teamsTable} (team_id)    
  );
`;

export const createSearchPostingsTableQuery = `
  CREATE TABLE IF NOT EXISTS ${searchJobPostingsTable} (
    search_id INTEGER REFERENCES ${searchesTable} (search_id),
    posting_id INTEGER REFERENCES ${jobPostingsTable} (posting_id),
    PRIMARY KEY(search_id, posting_id)
  );
`;

export const createSearchCompaniesTableQuery = `
  CREATE TABLE IF NOT EXISTS ${searchCompaniesTable} (
    search_id INTEGER REFERENCES ${searchesTable} (search_id),
    company_id INTEGER REFERENCES ${companiesTable} (company_id),
    PRIMARY KEY(search_id, company_id)
  );
`;

export const createPeopleTableQuery = `
  CREATE TABLE IF NOT EXISTS ${peopleTable} (
    people_id SERIAL PRIMARY KEY,
    apollo_id VARCHAR(255) UNIQUE,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    title VARCHAR(255),
    headline VARCHAR(255),
    seniority VARCHAR(255),
    emails VARCHAR(255)[],
    departments VARCHAR(255)[],
    sub_departments VARCHAR(255)[],
    functions VARCHAR(255)[],
    phones VARCHAR(255)[],
    facebook_url VARCHAR(255),
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    photo_url VARCHAR(255),
    twitter_url VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    country VARCHAR(255),
    company_id INTEGER REFERENCES ${companiesTable} (company_id)
  );
`;

export const createPeopleSequencesTableQuery = `
  CREATE TABLE IF NOT EXISTS ${peopleSequencesTable}(
    id SERIAL PRIMARY KEY,
    people_id INTEGER REFERENCES ${peopleTable} (people_id),
    sequence_1 TEXT,
    sequence_2 TEXT,
    sequence_3 TEXT,
    sequence_4 TEXT,
    sequence_5 TEXT,
    sequence_6 TEXT,
    sequence_7 TEXT
  );
`;
