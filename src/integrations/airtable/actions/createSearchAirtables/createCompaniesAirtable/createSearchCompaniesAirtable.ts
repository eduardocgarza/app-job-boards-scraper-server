import addRecordsSearchCompaniesTable from "./addRecordsSearchCompaniesTable";
import createSearchCompaniesTable from "./createSearchCompaniesTable";
import { IAirtableIds, IPreStoreAirtable, IPreStoreSearchCompanyAirtable } from "../../../config/airtableInterfaces";

export default async function createSearchCompaniesAirtable(
  tableOptions: IPreStoreAirtable,
  companies: IPreStoreSearchCompanyAirtable[],
): Promise<IAirtableIds> {
  console.log("** @createSearchCompaniesAirtable - Before @createSearchCompaniesTable");
  const airtableIds = await createSearchCompaniesTable(tableOptions);
  console.log("** @createSearchCompaniesAirtable - After @createSearchCompaniesTable");

  console.log("** @createSearchCompaniesAirtable - Before @addRecordsSearchCompaniesTable");
  await addRecordsSearchCompaniesTable(airtableIds, companies);
  console.log("** @createSearchCompaniesAirtable - After @addRecordsSearchCompaniesTable");

  return airtableIds;
}
