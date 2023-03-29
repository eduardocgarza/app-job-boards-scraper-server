/**
 * @IRawJobPosting - Interface for raw job posting data from Glassdoor
 *  This is for testing purposes and includes all the fields that are
 *    extracted from the SearchJobPosting page, for a single item.
 *
 */
export interface IRawJobPosting {
  companyName: string;
  roleName: string;
  roleLocation: string;
  salaryRange: string;
  jobPostingURL: string;
  glassdoorJobPostingId: string;
  companyRating: string;
  easyApply: boolean;
  datePosted: string;
}

// For Preparation to createPostingRecord
export interface IPreStoreJobPosting {
  companyId: string;
  salaryRange: string;
  datePosted: string;
  roleName: string;
  roleLocation: string;
  jobPostingURL: string;
  glassdoorJobPostingId: string;
}

// Complete Job Posting
export interface IJobPosting extends IPreStoreJobPosting {
  postingId: string;
  verified: boolean;
  jobDescription: string;
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

export type ICompanyHashMap = { [key: string]: ICompany };
