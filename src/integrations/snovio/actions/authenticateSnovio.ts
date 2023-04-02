import axios from "axios";
import { SNOVIO_API } from "../config/snovioConstants";
const { SNOVIO_API_USER_ID, SNOVIO_API_TOKEN } = process.env;

interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export default async function authenticateSnovio(): Promise<string> {
  const authenticateEndpoint = `${SNOVIO_API.baseURL}${SNOVIO_API.authenticateURL}`;
  const params = {
    grant_type: "client_credentials",
    client_id: SNOVIO_API_USER_ID,
    client_secret: SNOVIO_API_TOKEN,
  };

  try {
    const response = await axios.post<AccessTokenResponse>(authenticateEndpoint, params);
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
}
