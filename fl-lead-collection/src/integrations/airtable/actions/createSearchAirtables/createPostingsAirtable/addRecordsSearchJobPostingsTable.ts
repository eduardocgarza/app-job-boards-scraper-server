import axios from "axios";
import { postingsFieldNames } from "@/integrations/airtable/schemas/searchJobPostingsAirtableSchema";
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
  IPreStoreSearchPostingAirtable,
} from "../../../config/airtableInterfaces";
import convertToAirtableDate from "@/integrations/airtable/helpers/convertToAirtableDate";

function createJobPostingLists(postings: IPreStoreSearchPostingAirtable[]) {
  const lists = [];
  const batchSize = ADD_RECORDS_BATCH_SIZE;
  for (let index = 0; index < postings.length; index += batchSize) {
    lists.push(postings.slice(index, index + batchSize));
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

function convertToAirtableFormat(list: IPreStoreSearchPostingAirtable[]) {
  return list.map((v) => ({
    fields: {
      [postingsFieldNames.jobPostingID.name]: clean(v.jobPostingId),
      [postingsFieldNames.glassdoorJobPostingID.name]: clean(v.glassdoorJobPostingId),
      [postingsFieldNames.roleName.name]: clean(v.roleName),
      [postingsFieldNames.roleLocation.name]: clean(v.roleLocation),
      [postingsFieldNames.salaryRange.name]: clean(v.salaryRange),
      [postingsFieldNames.jobPostingURL.name]: clean(v.jobPostingURL),
      [postingsFieldNames.datePosted.name]: convertToAirtableDate(clean(v.datePosted)),
      [postingsFieldNames.teamID.name]: clean(v.teamId),
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

export default async function addRecordsSearchPostingsTable(
  airtableIds: IAirtableIds,
  postings: IPreStoreSearchPostingAirtable[],
) {
  const { airtableId } = airtableIds;
  const addRecordsURL = `${AIRTABLE_API.baseURL}/${AIRTABLE_BASE_ID}/${airtableId}`;
  const jobPostingLists = createJobPostingLists(postings);
  for (const list of jobPostingLists) {
    const jobPostingRecords = convertToAirtableFormat(list);
    const payload = { records: jobPostingRecords };
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
