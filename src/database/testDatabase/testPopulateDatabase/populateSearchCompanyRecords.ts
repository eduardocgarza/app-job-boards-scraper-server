import { pool } from "@/database/databaseConfiguration";
import { searchCompaniesTable } from "@/database/dbConstants";

type TValuesMap = Array<string | number>[];

function createValuesMap(values: TValuesMap) {
  return values.map((_, i) => `($${2 * i + 1}, $${2 * i + 2})`).join(",");
}

export default async function populateSearchCompanyRecords(searchId: string, companyIds: string[]) {
  if (!companyIds.length) return;
  const values: TValuesMap = companyIds.map((companyId) => [companyId, searchId]);
  const valuesMap = createValuesMap(values);
  const searchCompaniesQuery = `
    INSERT INTO ${searchCompaniesTable} 
      (company_id, search_id)
    VALUES ${valuesMap}
    ON CONFLICT DO NOTHING;
  `;
  const client = await pool.connect();
  try {
    await client.query(searchCompaniesQuery, values.flat());
  } catch (error) {
    throw new Error("Failed to populateSearchCompanyRecords: " + error);
  } finally {
    client.release();
  }
}
