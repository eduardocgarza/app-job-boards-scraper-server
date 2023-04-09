import createSearchJobPostingsTable from "./createSearchJobPostingsTable";
import addRecordsSearchPostingsTable from "./addRecordsSearchJobPostingsTable";
import { IAirtableIds, IPreStoreAirtable, IPreStoreSearchPostingAirtable } from "../../../config/airtableInterfaces";

export default async function createSearchJobPostingsAirtable(
  tableOptions: IPreStoreAirtable,
  postings: IPreStoreSearchPostingAirtable[],
): Promise<IAirtableIds> {
  console.log("%% @createSearchJobPostingsAirtable - Before @createSearchJobPostingsTable");
  const airtableIds = await createSearchJobPostingsTable(tableOptions);
  console.log("%% @createSearchJobPostingsAirtable - After@createSearchJobPostingsTable");

  console.log("%% @createSearchJobPostingsAirtable - Before @addRecordsSearchPostingsTable");
  await addRecordsSearchPostingsTable(airtableIds, postings);
  console.log("%% @createSearchJobPostingsAirtable - After@addRecordsSearchPostingsTable");

  return airtableIds;
}
