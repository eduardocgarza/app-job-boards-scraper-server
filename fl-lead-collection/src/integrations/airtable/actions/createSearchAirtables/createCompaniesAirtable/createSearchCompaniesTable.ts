import { IPreStoreAirtable } from "@/integrations/airtable/config/airtableInterfaces";

export default async function createSearchCompaniesTable(
  tableOptions: IPreStoreAirtable,
) {
  const { tableName, tableDescription } = tableOptions;
  console.log(`-- createSearchCompaniesTable: ${tableName} and ${tableDescription}`);
  return { airtableId: "airtableId", primaryFieldId: "primaryFieldId" };
}
