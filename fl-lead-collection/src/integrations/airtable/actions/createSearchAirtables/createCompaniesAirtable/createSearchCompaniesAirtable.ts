import addRecordsSearchCompaniesTable from "./addRecordsSearchCompaniesTable";
import createSearchCompaniesTable from "./createSearchCompaniesTable";
import {
  IAirtableIds,
  IPreStoreAirtable,
  IPreStoreSearchCompanyAirtable,
} from "../../../config/airtableInterfaces";

export default async function createSearchCompaniesAirtable(
  tableOptions: IPreStoreAirtable,
  companies: IPreStoreSearchCompanyAirtable[],
): Promise<IAirtableIds> {
  const airtableIds = await createSearchCompaniesTable(tableOptions);
  await addRecordsSearchCompaniesTable(airtableIds, companies);
  return airtableIds;
}
