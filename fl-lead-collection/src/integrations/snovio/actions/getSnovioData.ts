import axios from "axios";
import { SNOVIO_API } from "../config/snovioConstants";
const { SNOVIO_API_TOKEN } = process.env;

interface EmailFinderInput {
  firstName: string;
  lastName: string;
  domain: string;
}

interface EmailFinderResult {
  success: boolean;
  params: {
    firstName: string;
    lastName: string;
    domain: string;
  };
  data: {
    firstName: string;
    lastName: string;
    emails: {
      email: string;
      emailStatus: "valid" | "unknown";
    }[];
  };
  status: {
    identifier: "complete" | "in_progress" | "not_found";
    description: string;
  };
}

export default async function getSnovioData(
  accessToken: string,
  input: EmailFinderInput,
): Promise<EmailFinderResult> {
  const { firstName, lastName, domain } = input;
  const emailFinderEndpoint = `${SNOVIO_API.baseURL}${SNOVIO_API.emailFinderURL}`;
  const body = {
    firstName,
    lastName,
    domain,
  };
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
    "Content-Type": "application/json",
  };

  const response = await axios.post<EmailFinderResult>(emailFinderEndpoint, body, config);
  return response.data;
}
