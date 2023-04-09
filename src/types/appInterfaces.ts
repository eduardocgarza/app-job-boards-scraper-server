import { Request } from "express";

/**
 * @IRawJobPosting - Interface for raw job posting data from Glassdoor
 *  This is for testing purposes and includes all the fields that are
 *    extracted from the SearchJobPosting page, for a single item.
 *
 */

export interface IRawJobPosting {
  teamName: string;
  roleName: string;
  roleLocation: string;
  salaryRange: string;
  datePosted: string;
  postingURL: string;
  platformPostingId: string;
  companyRating: string;
  easyApply: boolean;
}

// For Preparation to createPostingRecord
export interface IPreStoreJobPosting {
  companyId: string;
  teamId: string;
  roleName: string;
  roleLocation: string;
  salaryRange: string;
  datePosted: string;
  postingURL: string;
  platform: string;
  platformPostingId: string;
}

// Complete Job Posting
export interface IJobPosting extends IPreStoreJobPosting {
  postingId: string;
  verified: boolean;
  jobDescription: string;
  expired: boolean;
}

export type IAJobPosting = IRawJobPosting | IJobPosting;
export type IAAJobPosting = IRawJobPosting[] | IJobPosting[];

export interface ISearch {
  campaignName: string;
  campaignDescription: string;
  locationName: string;
  roles: string[];
  platforms: string[];
}

export interface ICompany {
  companyId: string;
  companyName: string;
  verified: boolean;
}

// Search Router
export interface IRawSearchObject {
  campaignName: string;
  campaignDescription: string;
  locationName: string;
  roles: string[];
  platforms: string[];
}

export interface ISearchRoute extends Request {
  body: IRawSearchObject;
}

export interface IRawTeam {
  teamName: string;
  companyId: string;
}

export interface ITeam {
  teamId: string;
  teamName: string;
  companyId: string;
}

export interface ISearchObject extends IRawSearchObject {
  searchId: string;
  searchStatusId: number;
  createdAt: string;
}

export interface IJobPostingsSearch {
  locationName: string;
  roleName: string;
  datePosted: boolean;
  // companySize: number;
}

export type ITeamHashMap = { [key: string]: ITeam };

export interface IRawCompanyDetailsInput {
  companyName: string;
  companyProfileURL: string;
  companyUsername: string;
  headquartersLocation: string;
}

export interface ICompanyDetailsInput extends IRawCompanyDetailsInput {
  companyId: string;
}

export interface IExecuteSearchObject {
  searchId: string;
  locationName: string;
  platforms: string[];
}
