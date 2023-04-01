import {
  companiesTable,
  jobPostingsTable,
  searchCompaniesTable,
  searchJobPostingsTable,
  searchesTable,
  teamsTable,
} from "@/database/dbConstants";

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
  DELETE FROM ${searchCompaniesTable};
`;

export const deleteSearchPostingsQuery = `
  DELETE FROM ${searchJobPostingsTable};
`;

export const deleteJobPostingsQuery = `
  DELETE FROM ${jobPostingsTable};
`;

export const deleteCompaniesQuery = `
  DELETE FROM ${companiesTable};
`;

export const deleteTeamsQuery = `
  DELETE FROM ${teamsTable};
`;

export const deleteSearchesQuery = `
  DELETE FROM ${searchesTable};
`;
