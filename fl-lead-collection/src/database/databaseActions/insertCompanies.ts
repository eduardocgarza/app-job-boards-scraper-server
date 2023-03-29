import { pool } from "../databaseConfiguration";
import { DB_TABLE_NAMES } from "../dbConstants";

export default async function insertCompanies(companies: string[]) {
  const query = `
    INSERT INTO ${DB_TABLE_NAMES.companiesTable} 
      (company_name)
    SELECT unnest($1::text[]) AS company_name
    ON CONFLICT 
      (company_name) 
    DO UPDATE 
      SET company_name = EXCLUDED.company_name
    RETURNING *
  `;
  const { rows } = await pool.query(query, [companies]);
  return rows.map((company) => ({
    companyId: company.company_id,
    companyName: company.company_name,
    verified: company.verified,
  }));
}
