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

export default async function addRecordsSearchPostingsTable(
  airtableIds: IAirtableIds,
  postings: IPreStoreSearchPostingAirtable[],
) {
  const { airtableId } = airtableIds;
  const addRecordsURL = `${AIRTABLE_API.baseURL}/${AIRTABLE_BASE_ID}/${airtableId}`;
  const jobPostingLists = createJobPostingLists(postings);
  for (const list of jobPostingLists) {
    const jobPostingRecords = list.map((v) => ({
      fields: {
        [postingsFieldNames.jobPostingID.name]: v.jobPostingId,
        [postingsFieldNames.glassdoorJobPostingID.name]: v.glassdoorJobPostingId,
        [postingsFieldNames.roleName.name]: v.roleName,
        [postingsFieldNames.roleLocation.name]: v.roleLocation,
        [postingsFieldNames.salaryRange.name]: v.salaryRange,
        [postingsFieldNames.jobPostingURL.name]: v.jobPostingURL,
        [postingsFieldNames.datePosted.name]: v.datePosted,
        [postingsFieldNames.teamID.name]: v.teamId,
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
