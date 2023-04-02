import axios, { AxiosError } from "axios";
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
import convertToAirtableDate from "@/integrations/airtable/helpers/convertToAirtableDate";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function clean(obj: any) {
  return obj ? String(obj) : "";
}

function convertToAirtableFormat(list: IPreStoreSearchCompanyAirtable[]) {
  return list.map((v) => ({
    fields: {
      [companiesFieldNames.companyId.name]: clean(v.companyId),
      [companiesFieldNames.companyName.name]: clean(v.companyName),
      [companiesFieldNames.companyUsername.name]: clean(v.companyUsername),
      [companiesFieldNames.companyProfileURL.name]: clean(v.companyProfileURL),
      [companiesFieldNames.headquartersLocation.name]: clean(v.headquartersLocation),
      [companiesFieldNames.numTeams.name]: Number(v.numTeams),
      [companiesFieldNames.numPostings.name]: Number(v.numPostings),
      [companiesFieldNames.latestPostingDate.name]: convertToAirtableDate(
        clean(v.latestPostingDate),
      ),
    },
  }));
}

export default async function addRecordsSearchCompaniesTable(
  airtableIds: IAirtableIds,
  companies: IPreStoreSearchCompanyAirtable[],
) {
  const { airtableId } = airtableIds;
  const addRecordsURL = `${AIRTABLE_API.baseURL}/${AIRTABLE_BASE_ID}/${airtableId}`;
  const companyLists = createCompanyLists(companies);
  console.log("companyLists: ", companyLists);
  for (const list of companyLists) {
    const companyRecords = convertToAirtableFormat(list);
    const payload = { records: companyRecords };
    const options = {
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post(addRecordsURL, payload, options);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log(`1 == Error status: ${axiosError.response?.status}`);
        console.log(`2 == Error message: ${axiosError.message}`);
      } else {
        console.log(`3==Error message: ${(error as Error).message}`);
      }
      throw error;
    }
    await sleep(API_SLEEP_AMOUNT); // 250ms delay to maintain < 5 request/s limit
  }
}
