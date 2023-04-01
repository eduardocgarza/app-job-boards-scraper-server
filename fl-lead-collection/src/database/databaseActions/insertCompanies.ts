import { pool } from "../databaseConfiguration";
import companiesToCamelCase from "../databaseDataConverters/companiesToCamelCase";
import { companiesTable } from "../dbConstants";

async function insertCompanies(companies: string[]) {
  const query = `
    INSERT INTO ${companiesTable} 
      (company_name)
    SELECT unnest($1::text[]) AS company_name
    RETURNING *
  `;
  const { rows } = await pool.query(query, [companies]);
  return rows.map(companiesToCamelCase);
}

export async function insertCompaniesFromNames(companyNames: string[]) {
  return await insertCompanies(companyNames);
}

export async function insertCompaniesFromTeams(teams: string[]) {
  const rawCompanies = teams.map(() => "");
  return await insertCompanies(rawCompanies);
}
