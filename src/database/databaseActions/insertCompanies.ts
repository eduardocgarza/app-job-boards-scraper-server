import { pool } from "../databaseConfiguration";
import companyConverterOut from "../databaseDataConverters/companyConverterOut";
import { companiesTable } from "../dbConstants";

async function insertCompanies(companies: string[]) {
  const query = `
    INSERT INTO ${companiesTable} 
      (company_name)
    SELECT unnest($1::text[]) AS company_name
    RETURNING *
  `;
  const { rows } = await pool.query(query, [companies]);
  return rows.map(companyConverterOut);
}

export async function insertCompaniesFromNames(companyNames: string[]) {
  return await insertCompanies(companyNames);
}

export async function insertCompaniesFromTeams(teams: string[]) {
  const rawCompanies = teams.map(() => "");
  return await insertCompanies(rawCompanies);
}
