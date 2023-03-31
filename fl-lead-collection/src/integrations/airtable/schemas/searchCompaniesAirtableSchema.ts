export const companiesFieldNames = {
  companyId: {
    name: "Company ID",
    description: "The unique identifier for the company of the job posting",
    type: "singleLineText",
  },
  companyName: {
    name: "Company Name",
    description: "The name of the company of the job posting",
    type: "singleLineText",
  },
  companyUsername: {
    name: "Company Username",
    description: "The username of the company of the job posting",
    type: "singleLineText",
  },
  companyProfileURL: {
    name: "Company URL",
    description: "The URL to the company profile page",
    type: "url",
  },
  headquartersLocation: {
    name: "Headquarters Location",
    description: "The location of the company headquarters",
    type: "singleLineText",
  },
  numTeams: {
    name: "No. Teams",
    description: "The number of teams from the company",
    type: "number",
    options: {
      precision: 0,
    },
  },
  numPostings: {
    name: "No. Job Postings",
    description: "The number of job postings from the company",
    type: "number",
    options: {
      precision: 0,
    },
  },
  latestPostingDate: {
    name: "Latest Job Posting Date",
    description: "The date of the most recent job posting from the company",
    type: "date",
    options: {
      dateFormat: {
        format: "M/D/YYYY",
        name: "us",
      },
    },
  },
};

const searchCompaniesAirtableSchema = [
  companiesFieldNames.companyId,
  companiesFieldNames.companyName,
  companiesFieldNames.companyUsername,
  companiesFieldNames.companyProfileURL,
  companiesFieldNames.headquartersLocation,
  companiesFieldNames.numTeams,
  companiesFieldNames.numPostings,
  companiesFieldNames.latestPostingDate,
];

export default searchCompaniesAirtableSchema;
