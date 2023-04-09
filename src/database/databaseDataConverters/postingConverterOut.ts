import { IJobPosting } from "@/types/appInterfaces";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function postingConverterOut(obj: any): IJobPosting {
  return {
    postingId: obj.posting_id,
    platformPostingId: obj.platform_posting_id,
    roleName: obj.role_name,
    roleLocation: obj.role_location,
    salaryRange: obj.salary_range,
    postingURL: obj.posting_url,
    datePosted: obj.date_posted,
    verified: obj.verified,
    jobDescription: obj.job_description,
    expired: obj.expired,
    platform: obj.platform,
    companyId: obj.company_id,
    teamId: obj.team_id,
  };
}
