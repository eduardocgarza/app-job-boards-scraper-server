import { PoolClient } from "pg";
import { IPreStoreSearchCompanyAirtable } from "../../config/airtableInterfaces";
import companyConverterOut from "@/database/databaseDataConverters/companyConverterOut";
import {
  companiesTable,
  jobPostingsTable,
  searchCompaniesTable,
} from "@/database/dbConstants";

export default async function getSearchCompanies(
  client: PoolClient,
  searchId: string,
): Promise<IPreStoreSearchCompanyAirtable[]> {
  const companiesQuery = `
    SELECT c.* 
    FROM ${companiesTable} AS c
    JOIN ${searchCompaniesTable} AS sc 
      ON c.company_id = sc.company_id
    WHERE 
      sc.search_id = $1 AND
      c.verified=true;
  `;
  const companiesResult = await client.query(companiesQuery, [searchId]);
  const companies = companiesResult.rows.map(companyConverterOut);
  const companyIds = companies.map((company) => company.companyId);
  const postingsQuery = `
    SELECT
      company_id,
      COUNT(DISTINCT posting_id) AS "numPostings",
      COUNT(DISTINCT team_id) AS "numTeams",
      MAX(date_posted) AS "latestPostingDate"
    FROM ${jobPostingsTable}
    WHERE 
      company_id = ANY($1)
    GROUP BY 
      company_id;
  `;
  try {
    const postingsResult = await client.query(postingsQuery, [companyIds]);
    const statsByCompanyId = postingsResult.rows.reduce((acc, row) => {
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
