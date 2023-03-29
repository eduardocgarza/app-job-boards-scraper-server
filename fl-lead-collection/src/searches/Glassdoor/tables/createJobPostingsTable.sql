CREATE TABLE job_postings
(
  posting_id SERIAL PRIMARY KEY,
  role_name TEXT NOT NULL,
  role_location TEXT NOT NULL,
  salary_range TEXT,
  posting_url TEXT NOT NULL,
  company_rating FLOAT NOT NULL,
  easy_apply BOOLEAN NOT NULL,
  date_posted TEXT,
  company_id INTEGER REFERENCES companies(company_id)
);