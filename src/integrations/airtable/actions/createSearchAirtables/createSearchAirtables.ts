import getSearchData from "../../helpers/getSearchData/getSearchData";
import createSearchJobPostingsAirtable from "./createPostingsAirtable/createSearchJobPostingsAirtable";
import createSearchCompaniesAirtable from "./createCompaniesAirtable/createSearchCompaniesAirtable";
import updateSearchAirtableIds from "../../helpers/updateSearchAirtableIds";
import { IPreStoreSearchAirtableOptions, ISearchInsertData } from "../../config/airtableInterfaces";

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

  console.log("@createSearchAirtables - * Before: getSearchData");
  const { companies, postings }: ISearchInsertData = await getSearchData(searchId);
  console.log("@createSearchAirtables - * After: getSearchData");

  console.log("@createSearchAirtables - * Before: createSearchCompaniesAirtable");
  const companiesAirtableId = await createSearchCompaniesAirtable(companiesOptions, companies);
  console.log("@createSearchAirtables - * After: createSearchCompaniesAirtable");

  console.log("@createSearchAirtables - * Before: createSearchJobPostingsAirtable");
  const postingsAirtableId = await createSearchJobPostingsAirtable(postingsOptions, postings);
  console.log("@createSearchAirtables - * After: createSearchJobPostingsAirtable");

  const airtableIds = { companiesAirtableId, postingsAirtableId };

  console.log("@createSearchAirtables - * Before: updateSearchAirtableIds");
  await updateSearchAirtableIds(searchId, airtableIds);
  console.log("@createSearchAirtables - * After: updateSearchAirtableIds");

  return airtableIds;
}
