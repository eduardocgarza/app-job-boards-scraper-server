import { pool } from "@/database/databaseConfiguration";
import { DB_TABLE_NAMES } from "@/database/dbConstants";

type TValuesMap = Array<string | number>[];

function createValuesMap(values: TValuesMap) {
  return values.map((_, i) => `($${2 * i + 1}, $${2 * i + 2})`).join(",");
}

export default async function populateSearchCompanyRecords(
  searchId: string,
  companyIds: string[],
) {
  const values: TValuesMap = companyIds.map((companyId) => [companyId, searchId]);
  const valuesMap = createValuesMap(values);
  const searchCompaniesQuery = `
    INSERT INTO ${DB_TABLE_NAMES.searchCompaniesTable} 
      (company_id, search_id)
    VALUES ${valuesMap}
    ON CONFLICT 
      (company_id, search_id)
    DO UPDATE SET
      company_id = excluded.company_id,
      search_id = excluded.search_id
  `;
  await pool.query(searchCompaniesQuery, values.flat());
}
