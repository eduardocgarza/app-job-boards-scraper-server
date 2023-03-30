import axios from "axios";
import {
  AIRTABLE_API,
  AIRTABLE_BASE_ID,
  AIRTABLE_TOKEN,
} from "../../config/airtableConstants";

export default async function fetchAirtableRecords(
  baseId: string,
  tableId: string,
  numRecords: number,
) {
  let offset = null;
  let records = [];

  // https://api.airtable.com/v0/{baseId}/{tableIdOrName}
  let fetchRecordsEndpoint = `${AIRTABLE_API.baseURL}/${AIRTABLE_BASE_ID}/${tableId}`;

  do {
    if (offset) fetchRecordsEndpoint += `?offset=${offset}`;
    const response = await axios.get(fetchRecordsEndpoint, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      },
    });

    records = records.concat(response.data.records);
    offset = response.data.offset;
  } while (offset);

  return records;
}
