import createSearchJobPostingsTable from "./createSearchJobPostingsTable";
import addRecordsSearchPostingsTable from "./addRecordsSearchJobPostingsTable";
import {
  IAirtableIds,
  IPreStoreAirtable,
  IPreStoreSearchPostingAirtable,
} from "../../../config/airtableInterfaces";

export default async function createSearchJobPostingsAirtable(
  tableOptions: IPreStoreAirtable,
  postings: IPreStoreSearchPostingAirtable[],
): Promise<IAirtableIds> {
  const airtableIds = await createSearchJobPostingsTable(tableOptions);
  await addRecordsSearchPostingsTable(airtableIds, postings);
  return airtableIds;
}
