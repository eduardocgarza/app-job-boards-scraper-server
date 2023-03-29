CREATE TABLE companies (
  company_id SERIAL PRIMARY KEY,
  company_name TEXT UNIQUE NOT NULL
);