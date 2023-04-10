import { pool } from "../databaseConfiguration";
import { companiesTable } from "../dbConstants";
import companyConverterOut from "../databaseDataConverters/companyConverterOut";

export async function insertCompanies(teams: string[]) {
  if (teams.length === 0) return [];
  const values = teams.map((_, index) => `($${index + 1})`).join(",");
  const query = `
    INSERT INTO ${companiesTable} (company_name) 
    VALUES ${values}
    RETURNING *;
  `;
  const params = [...teams];
  const client = await pool.connect();
  try {
    const newCompaniesResponse = await client.query(query, params);
    return newCompaniesResponse.rows.map(companyConverterOut);
  } catch (error) {
    throw new Error(":: Database Error -- @insertCompanies ::" + error);
  } finally {
    client.release();
  }
}
