import { ISearchObject } from "@/types/appInterfaces";

export interface IPreStoreAirtable {
  tableName: string;
  tableDescription: string;
}

export interface IAirtable extends IPreStoreAirtable {
  airtableId: string;
  primaryFieldId: string;
}

export interface IPreStoreSearchAirtableOptions {
  postingsOptions: IPreStoreAirtable;
  companiesOptions: IPreStoreAirtable;
}

export interface IBaseOptions {
  baseName: string;
  baseDescription: string;
}

export interface IPreStoreSearchCompanyAirtable {
  companyId: string;
  companyName: string;
  companyUsername: string;
  companyProfileURL: string;
  headquartersLocation: string;
  numTeams: number;
  numPostings: number;
  latestPostingDate: string;
}

export interface IPreStoreSearchPostingAirtable extends IPreStoreSearchCompanyAirtable {
  jobPostingId: string;
  glassdoorJobPostingId: string;
  roleName: string;
  roleLocation: string;
  salaryRange: string;
  jobPostingURL: string;
  datePosted: string;
  teamId: string;
  teamName: string;
}

export interface ISearchAirtablesData {
  searchOptions: ISearchObject;
  tableOptions: IPreStoreAirtable;
  companiesData: IPreStoreSearchCompanyAirtable[];
  jobPostingsData: IPreStoreSearchPostingAirtable[];
}

export type ISearchCompanyAirtable = IAirtable & IPreStoreSearchCompanyAirtable;
export type ISearchJobPostingAirtable = IAirtable & IPreStoreSearchCompanyAirtable;

// Airtable Ids
export interface IAirtableIds {
  airtableId: string;
  primaryFieldId: string;
}

export interface ISearchAirtableIds {
  companiesAirtableId: IAirtableIds;
  postingsAirtableId: IAirtableIds;
}

//
export interface ISearchInsertData {
  companies: IPreStoreSearchCompanyAirtable[];
  postings: IPreStoreSearchPostingAirtable[];
}
