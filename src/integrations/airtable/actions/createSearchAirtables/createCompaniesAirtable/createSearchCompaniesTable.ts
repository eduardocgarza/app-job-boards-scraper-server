import axios from "axios";
import { IPreStoreAirtable } from "@/integrations/airtable/config/airtableInterfaces";
import searchCompaniesAirtableSchema from "@/integrations/airtable/schemas/searchCompaniesAirtableSchema";
import {
  AIRTABLE_API,
  AIRTABLE_BASE_ID,
  AIRTABLE_TOKEN,
} from "@/integrations/airtable/config/airtableConstants";

export default async function createSearchCompaniesTable(
  tableOptions: IPreStoreAirtable,
) {
  const { tableName, tableDescription } = tableOptions;
  const { baseURL } = AIRTABLE_API;
  const createTableURL = `${baseURL}/meta/bases/${AIRTABLE_BASE_ID}/tables`;
  const payload = {
    name: tableName,
    description: tableDescription,
    fields: searchCompaniesAirtableSchema,
  };
  const options = {
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(createTableURL, payload, options);
  const { id: airtableId, primaryFieldId } = response.data;
  console.log(`Created Airtable: ID ${airtableId}, Field ID ${primaryFieldId}.`);
  return { airtableId, primaryFieldId };
}
