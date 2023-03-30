import { DB_TABLE_NAMES } from "@/database/dbConstants";
import { ISearchAirtableIds } from "../config/airtableInterfaces";
import { pool } from "@/database/databaseConfiguration";

export default async function updateSearchAirtableIds(
  searchId: string,
  airtableIds: ISearchAirtableIds,
) {
  const { companiesAirtableId, postingsAirtableId } = airtableIds;
  const query = `
    UPDATE ${DB_TABLE_NAMES.searchesTable}
    SET 
      search_companies_airtable_id = $1,
      search_companies_airtable_primary_field_id = $2,
      search_postings_airtable_id = $3,
      search_postings_airtable_primary_field_id = $4
    WHERE 
      search_id = $5
  `;
  await pool.query(query, [
    companiesAirtableId.airtableId,
    companiesAirtableId.primaryFieldId,
    postingsAirtableId.airtableId,
    postingsAirtableId.primaryFieldId,
    searchId,
  ]);
}
