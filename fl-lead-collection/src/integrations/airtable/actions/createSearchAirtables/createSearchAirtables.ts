import createSearchJobPostingsAirtable from "./createPostingsAirtable/createSearchJobPostingsAirtable";
import createSearchCompaniesAirtable from "./createCompaniesAirtable/createSearchCompaniesAirtable";
import getSearchData from "../../helpers/getSearchData/getSearchData";
import updateSearchAirtableIds from "../../helpers/updateSearchAirtableIds";
import {
  IPreStoreSearchAirtableOptions,
  ISearchInsertData,
} from "../../config/airtableInterfaces";

function generateTableOptions(searchId: string): IPreStoreSearchAirtableOptions {
  return {
    companiesOptions: {
      tableName: `at-search-companies-${searchId}`,
      tableDescription: `Airtable of Companies with Search ID ${searchId}`,
    },
    postingsOptions: {
      tableName: `at-search-postings-${searchId}`,
      tableDescription: `Airtable of Job Postings with Search ID ${searchId}`,
    },
  };
}

export default async function createSearchAirtables(searchId: string) {
  const tableOptions = generateTableOptions(searchId);
  const { postingsOptions, companiesOptions } = tableOptions;
  const { companies, postings }: ISearchInsertData = await getSearchData(searchId);
  const companiesAirtableId = await createSearchCompaniesAirtable(
    companiesOptions,
    companies,
  );
  const postingsAirtableId = await createSearchJobPostingsAirtable(
    postingsOptions,
    postings,
  );
  const airtableIds = { companiesAirtableId, postingsAirtableId };
  await updateSearchAirtableIds(searchId, airtableIds);
}
