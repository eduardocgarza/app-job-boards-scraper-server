import { IJobPosting } from "@/types/appInterfaces";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function postingsToCamelCase(obj: any): IJobPosting {
  return {
    postingId: obj.posting_id,
    jobPostingURL: obj.posting_url,
    glassdoorJobPostingId: obj.glassdoor_posting_id,
    companyId: obj.company_id,
    teamId: obj.team_id,
    roleName: obj.role_name,
    roleLocation: obj.role_location,
    salaryRange: obj.salary_range,
    datePosted: obj.date_posted,
    verified: obj.verified,
    jobDescription: obj.job_description,
  };
}
