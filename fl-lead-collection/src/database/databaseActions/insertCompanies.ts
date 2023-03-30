import { pool } from "../databaseConfiguration";
import { DB_TABLE_NAMES } from "../dbConstants";

async function insertCompanies(companies: string[]) {
  const query = `
    INSERT INTO ${DB_TABLE_NAMES.companiesTable} 
      (company_name)
    SELECT unnest($1::text[]) AS company_name
    RETURNING *
  `;
  const { rows } = await pool.query(query, [companies]);
  return rows.map((company) => ({
    companyId: company.company_id,
    companyName: company.company_name,
    verified: company.verified,
  }));
}

export async function insertCompaniesFromNames(companyNames: string[]) {
  return await insertCompanies(companyNames);
}

export async function insertCompaniesFromTeams(teams: string[]) {
  const rawCompanies = teams.map((_) => "");
  return await insertCompanies(rawCompanies);
}
