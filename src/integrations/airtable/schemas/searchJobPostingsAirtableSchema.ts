import { companiesFieldNames } from "./searchCompaniesAirtableSchema";

export const postingsFieldNames = {
  jobPostingID: {
    name: "Job Posting ID",
    description: "The unique identifier for the job posting",
    type: "singleLineText",
  },
  platformJobPostingID: {
    name: "Platform Job Posting ID",
    description: "The unique identifier for the job posting on Glassdoor",
    type: "singleLineText",
  },
  approved: {
    name: "Approved",
    description: "The field to edit as Approved or Not Approved",
    type: "singleLineText",
  },
  roleName: {
    name: "Role Name",
    description: "The name of the role",
    type: "singleLineText",
  },
  roleLocation: {
    name: "Role Location",
    description: "The location of the role",
    type: "singleLineText",
  },
  salaryRange: {
    name: "Salary Range",
    description: "The range of salary offered for the role",
    type: "singleLineText",
  },
  postingURL: {
    name: "Job Posting URL",
    description: "The URL to the job posting page",
    type: "url",
  },
  datePosted: {
    name: "Date Posted",
    description: "The date when the job posting was posted",
    type: "singleLineText",
  },
  teamID: {
    name: "Team ID",
    description: "The unique identifier for the team of the job posting",
    type: "singleLineText",
  },
};

const searchJobPostingsAirtableSchema = [
  postingsFieldNames.jobPostingID,
  postingsFieldNames.platformJobPostingID,
  postingsFieldNames.approved,
  postingsFieldNames.roleName,
  postingsFieldNames.roleLocation,
  postingsFieldNames.salaryRange,
  postingsFieldNames.postingURL,
  postingsFieldNames.datePosted,
  postingsFieldNames.teamID,
  companiesFieldNames.companyId,
  companiesFieldNames.companyName,
  companiesFieldNames.companyUsername,
  companiesFieldNames.companyProfileURL,
  companiesFieldNames.headquartersLocation,
  companiesFieldNames.numTeams,
  companiesFieldNames.numPostings,
  companiesFieldNames.latestPostingDate,
];

export default searchJobPostingsAirtableSchema;
