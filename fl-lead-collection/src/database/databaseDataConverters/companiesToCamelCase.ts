// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function companiesToCamelCase(obj: any) {
  return {
    companyId: obj.company_id,
    companyName: obj.company_name,
    verified: obj.verified,
  };
}
