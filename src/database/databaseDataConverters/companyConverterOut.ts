export interface ICompanyObject {
  companyId: string;
  companyName: string;
  companyUsername: string;
  companyProfileUrl: string;
  headquartersLocation: string;
  verified: boolean;
  crunchbaseUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  linkedinUid: string;
  twitterUrl: string;
  websiteUrl: string;
  phones: string[];
  primaryPhone: string;
  foundedYear: string;
  publiclyTradedSymbol: string;
  publiclyTradedExchange: string;
  logoUrl: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function companyConverterOut(obj: any): ICompanyObject {
  return {
    companyId: obj.company_id,
    companyName: obj.company_name,
    companyUsername: obj.company_username,
    companyProfileUrl: obj.company_profile_url,
    headquartersLocation: obj.headquarters_location,
    verified: obj.verified,
    crunchbaseUrl: obj.crunchbase_url,
    facebookUrl: obj.facebook_url,
    linkedinUrl: obj.linkedin_url,
    linkedinUid: obj.linkedin_uid,
    twitterUrl: obj.twitter_url,
    websiteUrl: obj.website_url,
    phones: obj.phones,
    primaryPhone: obj.primary_phone,
    foundedYear: obj.founded_year,
    publiclyTradedSymbol: obj.publicly_traded_symbol,
    publiclyTradedExchange: obj.publicly_traded_exchange,
    logoUrl: obj.logo_url,
  };
}
