/* eslint-disable @typescript-eslint/no-explicit-any */
import { originalTestData } from "./originalTestData";

interface ConvertedPerson {
  id: string;
  first_name: string;
  last_name: string;
  linkedin_url: string;
  title: string;
  email: string;
  organization_id: string;
  state: string;
  city: string;
  country: string;
  "organization.name": string;
  "organization.website_url": string;
}

interface CompanyMap {
  [companyId: string]: ConvertedPerson[];
}

type PersonWithOrganization = {
  id: string;
  first_name: string;
  last_name: string;
  linkedin_url: string;
  title: string;
  email: string;
  organization_id: string;
  state: string;
  city: string;
  country: string;
  organization: {
    id: string;
    name: string;
    website_url: string;
  };
};

function convertToHashMap(peopleArray: any): CompanyMap {
  const hashMap: CompanyMap = {};

  peopleArray.forEach((person: any) => {
    const companyId = person.organization_id;

    if (hashMap[companyId]) {
      hashMap[companyId].push({
        id: person.id,
        first_name: person.first_name,
        last_name: person.last_name,
        linkedin_url: person.linkedin_url,
        title: person.title,
        email: person.email,
        organization_id: person.organization_id,
        state: person.state,
        city: person.city,
        country: person.country,
        "organization.name": person.organization.name,
        "organization.website_url": person.organization.website_url || "",
      });
    } else {
      hashMap[companyId] = [
        {
          id: person.id,
          first_name: person.first_name,
          last_name: person.last_name,
          linkedin_url: person.linkedin_url,
          title: person.title,
          email: person.email,
          organization_id: person.organization_id,
          state: person.state,
          city: person.city,
          country: person.country,
          "organization.name": person.organization.name,
          "organization.website_url": person.organization.website_url || "",
        },
      ];
    }
  });

  return hashMap;
}

export const HASH_MAP = convertToHashMap(originalTestData);
