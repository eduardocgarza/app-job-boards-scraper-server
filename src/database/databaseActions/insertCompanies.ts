import { pool } from "../databaseConfiguration";
import companyConverterOut from "../databaseDataConverters/companyConverterOut";
import { companiesTable } from "../dbConstants";

export async function insertCompanies(numCompanies: number) {
  if (numCompanies === 0) return [];
  const query = `
    INSERT INTO ${companiesTable} (company_name) 
    VALUES(NULL)
    RETURNING *;
  `;
  const client = await pool.connect();
  try {
    const companyObjects = [];
    for (let index = 0; index < numCompanies; index++) {
      const result = await client.query(query);
      companyObjects.push(result.rows[0]);
    }
    return companyObjects.map(companyConverterOut);
  } catch (error) {
    throw new Error(":: Database Error -- @insertCompanies ::" + error);
  } finally {
    client.release();
  }
}
