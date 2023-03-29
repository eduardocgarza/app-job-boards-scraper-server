export const AIRTABLE_BASE_URL = "https://api.airtable.com/v0";

export const RAW_DATA_POSTS_PAGE_FIELDS = [
  {
    name: "Job Posting ID",
    description: "The unique identifier for each job posting",
    type: "singleLineText"
  },
  {
    name: "Role Name",
    description: "The name of the job position",
    type: "singleLineText"
  },
  {
    name: "Role Location",
    description: "The location of the job position",
    type: "singleLineText"
  },
  {
    name: "Salary Range",
    description: "The range of salary offered for the job position",
    type: "singleLineText"
  },
  {
    name: "Job Posting URL",
    description: "The URL to the job posting page",
    type: "url"
  },
  {
    name: "Date Posted",
    description: "The date when the job posting was posted",
    type: "date",
    options: {
      dateFormat: {
        format: "M/D/YYYY",
        name: "us"
      }
    }
  },
  {
    name: "Company ID",
    description: "The unique identifier for the company of the job posting",
    type: "singleLineText"
  },
  {
    name: "Company Name",
    description: "The name of the company of the job posting",
    type: "singleLineText"
  },
  {
    name: "Company URL",
    description: "The URL to the company profile page",
    type: "url"
  },
  {
    name: "Headquarters Location",
    description: "The location of the company headquarters",
    type: "singleLineText"
  },
  {
    name: "Number of Company Job Postings",
    description: "The number of job postings from the company",
    type: "number"
  },
];


export const RAW_DATA_COMPANIES_PAGE_FIELDS = [
  {
    name: "Company ID",
    description: "The unique identifier for the company of the job posting",
    type: "singleLineText"
  },
  {
    name: "Company Name",
    description: "The name of the company of the job posting",
    type: "singleLineText"
  },
  {
    name: "Company URL",
    description: "The URL to the company profile page",
    type: "url"
  },
  {
    name: "Headquarters Location",
    description: "The location of the company headquarters",
    type: "singleLineText"
  },
  {
    name: "Number of Company Job Postings",
    description: "The number of job postings from the company",
    type: "number"
  },
  {
    name: "Date of Most Recent Job Posting",
    description: "The date of the most recent job posting from the company",
    type: "date",
    options: {
      dateFormat: {
        format: "M/D/YYYY",
        name: "us"
      }
    }
  },
];