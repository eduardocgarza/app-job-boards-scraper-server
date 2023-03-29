import { DB_TABLE_NAMES } from "../../dbConstants";
const {
  searchCompaniesTable,
  searchJobPostingsTable,
  jobPostingsTable,
  companiesTable,
  searchesTable,
} = DB_TABLE_NAMES;

export const dropSearchCompaniesQuery = `
  DROP TABLE IF EXISTS ${searchCompaniesTable};
`;

export const dropSearchPostingsQuery = `
  DROP TABLE IF EXISTS ${searchJobPostingsTable};
`;

export const dropJobPostingsQuery = `
  DROP TABLE IF EXISTS ${jobPostingsTable};
`;

export const dropCompaniesQuery = `
  DROP TABLE IF EXISTS ${companiesTable};
`;

export const dropSearchesQuery = `
  DROP TABLE IF EXISTS ${searchesTable};
`;

export const deleteSearchCompaniesQuery = `
  DELETE FROM ${DB_TABLE_NAMES.searchCompaniesTable};
`;

export const deleteSearchPostingsQuery = `
  DELETE FROM ${DB_TABLE_NAMES.searchJobPostingsTable};
`;

export const deleteJobPostingsQuery = `
  DELETE FROM ${DB_TABLE_NAMES.jobPostingsTable};
`;

export const deleteCompaniesQuery = `
  DELETE FROM ${DB_TABLE_NAMES.companiesTable};
`;

export const deleteSearchesQuery = `
  DELETE FROM ${DB_TABLE_NAMES.searchesTable};
`;
