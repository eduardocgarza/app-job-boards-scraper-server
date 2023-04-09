import axios from "axios";
import searchJobPostingsAirtableSchema from "@/integrations/airtable/schemas/searchJobPostingsAirtableSchema";
import { AIRTABLE_API, AIRTABLE_BASE_ID, AIRTABLE_TOKEN } from "../../../config/airtableConstants";
import { IAirtableIds, IPreStoreAirtable } from "@/integrations/airtable/config/airtableInterfaces";

export default async function createSearchJobPostingsTable(tableOptions: IPreStoreAirtable): Promise<IAirtableIds> {
  const { tableName, tableDescription } = tableOptions;
  const { baseURL } = AIRTABLE_API;
  const createTableURL = `${baseURL}/meta/bases/${AIRTABLE_BASE_ID}/tables`;
  const payload = {
    name: tableName,
    description: tableDescription,
    fields: searchJobPostingsAirtableSchema,
  };
  const options = {
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(createTableURL, payload, options);
  const data = response.data;
  const { id: airtableId, primaryFieldId } = data;
  console.log(`Created Airtable: ID ${airtableId}, Field ID ${primaryFieldId}.`);
  return { airtableId, primaryFieldId };
}
