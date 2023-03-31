import axios from "axios";
import { IBaseOptions } from "../../config/airtableInterfaces";
import { AIRTABLE_API, AIRTABLE_TOKEN } from "../../config/airtableConstants";

export async function createAirtableBase(workspaceId: string, baseOptions: IBaseOptions) {
  const endpointUrl = `${AIRTABLE_API.baseURL}/meta/bases`;
  const { baseName, baseDescription } = baseOptions;
  const newTables = [
    {
      name: baseName,
      description: baseDescription,
      fields: [],
    },
  ];
  const apiBody = {
    name: baseName,
    workspaceId: workspaceId,
    tables: newTables,
  };
  const config = {
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(endpointUrl, apiBody, config);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
