import axios from "axios";
import { APOLLO_API } from "../config/apolloConstants";
import { IRawApolloObject } from "../config/apolloInterfaces";
const { APOLLO_API_TOKEN } = process.env;

export default async function getApolloData(rawApolloObject: IRawApolloObject) {
  const { domains, titles, page } = rawApolloObject;
  const peopelSearchEndpoint = `${APOLLO_API.baseURL}${APOLLO_API.peopleSearchURL}`;
  const body = {
    api_key: APOLLO_API_TOKEN,
    q_organization_domains: domains.join("\n"),
    page: page,
    person_titles: titles,
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  };
  try {
    const response = await axios.post(peopelSearchEndpoint, body, config);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
