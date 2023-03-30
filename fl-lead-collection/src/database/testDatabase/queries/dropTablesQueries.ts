import { DB_TABLE_NAMES } from "../../dbConstants";
const {
  searchCompaniesTable,
  searchJobPostingsTable,
  teamsTable,
  jobPostingsTable,
  companiesTable,
  searchesTable,
} = DB_TABLE_NAMES;

export const dropSearchCompaniesQuery = `
  DROP TABLE IF EXISTS ${searchCompaniesTable} CASCADE;
`;

export const dropSearchPostingsQuery = `
  DROP TABLE IF EXISTS ${searchJobPostingsTable} CASCADE;
`;

export const dropJobPostingsQuery = `
  DROP TABLE IF EXISTS ${jobPostingsTable} CASCADE;
`;

export const dropCompaniesQuery = `
  DROP TABLE IF EXISTS ${companiesTable} CASCADE;
`;

export const dropTeamsQuery = `
  DROP TABLE IF EXISTS ${teamsTable} CASCADE;
`;

export const dropSearchesQuery = `
  DROP TABLE IF EXISTS ${searchesTable} CASCADE;
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

export const deleteTeamsQuery = `
  DELETE FROM ${teamsTable};
`;

export const deleteSearchesQuery = `
  DELETE FROM ${DB_TABLE_NAMES.searchesTable};
`;
