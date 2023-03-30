import axios from "axios";
import { companiesFieldNames } from "@/integrations/airtable/schemas/searchCompaniesAirtableSchema";
import {
  ADD_RECORDS_BATCH_SIZE,
  AIRTABLE_API,
  AIRTABLE_BASE_ID,
  AIRTABLE_TOKEN,
  API_SLEEP_AMOUNT,
} from "../../../config/airtableConstants";
import {
  IAirtableIds,
  IPreStoreSearchCompanyAirtable,
} from "../../../config/airtableInterfaces";

function createCompanyLists(companies: IPreStoreSearchCompanyAirtable[]) {
  const lists = [];
  const batchSize = ADD_RECORDS_BATCH_SIZE;
  for (let index = 0; index < companies.length; index += batchSize) {
    lists.push(companies.slice(index, index + batchSize));
  }
  return lists;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function addRecordsSearchCompaniesTable(
  airtableIds: IAirtableIds,
  companies: IPreStoreSearchCompanyAirtable[],
) {
  const { airtableId } = airtableIds;
  const addRecordsURL = `${AIRTABLE_API.baseURL}/${AIRTABLE_BASE_ID}/${airtableId}`;
  const companyLists = createCompanyLists(companies);
  for (const list of companyLists) {
    const companyRecords = list.map((v) => ({
      fields: {
        [companiesFieldNames.companyId.name]: v.companyId,
        [companiesFieldNames.companyName.name]: v.companyName,
        [companiesFieldNames.companyUsername.name]: v.companyUsername,
        [companiesFieldNames.companyProfileURL.name]: v.companyProfileURL,
        [companiesFieldNames.headquartersLocation.name]: v.headquartersLocation,
        [companiesFieldNames.numTeams.name]: v.numTeams,
        [companiesFieldNames.numPostings.name]: v.numPostings,
        [companiesFieldNames.latestPostingDate.name]: v.latestPostingDate,
      },
    }));
    const payload = { records: companyRecords };
    const options = {
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
    };
    await axios.post(addRecordsURL, payload, options);
    await sleep(API_SLEEP_AMOUNT); // 250ms delay to maintain < 5 request/s limit
  }
}
