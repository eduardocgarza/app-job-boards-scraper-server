import { PoolClient } from "pg";
import { IPreStoreSearchCompanyAirtable } from "../../config/airtableInterfaces";
import { DB_TABLE_NAMES } from "@/database/dbConstants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatCompanies(companies: any[]) {
  return companies.map((company) => {
    return {
      companyId: company.company_id,
      companyName: company.company_name,
      companyUsername: company.company_username,
      companyProfileURL: company.company_profile_url,
      headquartersLocation: company.headquarters_location,
    };
  });
}

export default async function getSearchCompanies(
  client: PoolClient,
  searchId: string,
): Promise<IPreStoreSearchCompanyAirtable[]> {
  const companiesQuery = `
    SELECT c.* 
    FROM ${DB_TABLE_NAMES.companiesTable} AS c
    JOIN ${DB_TABLE_NAMES.searchCompaniesTable} AS sc 
      ON c.company_id = sc.company_id
    WHERE 
      sc.search_id = $1 AND
      c.verified=true;
  `;
  const companiesResult = await client.query(companiesQuery, [searchId]);
  const companies = formatCompanies(companiesResult.rows);
  const companyIds = companies.map((company) => company.companyId);
  const query = `
    SELECT
      company_id,
      COUNT(DISTINCT posting_id) AS "numPostings",
      COUNT(DISTINCT team_id) AS "numTeams",
      MAX(date_posted) AS "latestPostingDate"
    FROM ${DB_TABLE_NAMES.jobPostingsTable}
    WHERE company_id = ANY($1)
    GROUP BY company_id;
  `;

  try {
    const result = await client.query(query, [companyIds]);
    const statsByCompanyId = result.rows.reduce((acc, row) => {
      acc[row.company_id] = {
        numPostings: row.numPostings,
        numTeams: row.numTeams,
        latestPostingDate: row.latestPostingDate,
      };
      return acc;
    }, {});

    return companies.map((company) => ({
      ...company,
      ...statsByCompanyId[company.companyId],
    }));
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
}
